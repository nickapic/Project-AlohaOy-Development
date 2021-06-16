const express = require("express")
const router = express.Router();
const {check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config')
// Comments Documentation : Type of Route and endpoint : Description : Public/Private (Do you need a token or not)

//  POST api/users : Regiter User : Public

router.post('/', [ 
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a valid password with 8 or more characters').isLength({ min: 8 })
] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {name,email,password } = req.body;
    
    try {
    // User exists 
    let user = await User.findOne({email})
    if (user) {
       return res.status(400).json({ errors: [{msg: 'User already exists'}] });
    }

    // 2. Get users gravatar
    const avatar = gravatar.url(email,{
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    user = new User({
        name,
        email,
        avatar,
        password
    })
    //Doesnt Save it yet
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        user:{
            id : user.id
        }
    };

    jwt.sign(
        payload, 
        config.get('jwtsecret'),
        {expiresIn: 36000}, 
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
    );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error has occured')
    }
    // console.log(req.body); For testing
   // res.send('Here is some good data')
});

module.exports = router;
