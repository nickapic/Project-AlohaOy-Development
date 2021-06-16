const express = require('express');
const connectDB = require('./config/db');
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const path = require('path')

const app = express();

connectDB();

 app.use(express.json({
    extended: false
}))
// Defining port like so for the hosting enviornment to understand

app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());
//Protects parameter pollution and solves the error

app.use(hpp({})); //You can use whitelist to use properties that dont wanna use this

// Main Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/jobs', require('./routes/api/jobs'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000; 

// Starting the Server here 
app.listen(PORT, () => console.log(`Server is on at the port ${PORT}`))
