const express = require("express")
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const Job = require('../../models/Jobs')
const Profile = require('../../models/Profile')
const User = require('../../models/User');
const { post } = require("./profile");

// Comments Documentation : Type of Route and endpoint : Description : Public/Private (Do you need a token or not)

//  POST api/jobs : Create a Job : Private

router.post('/', [auth, [
    check('description', 'Description for the Job is required to Post about it.').not().isEmpty(),
    check('title', 'Title for the Job is required to Post about it.').not().isEmpty(),
    check('company', 'Company for the Job is required to Post about it.').not().isEmpty(),
]] , async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    try {

        const user = await User.findById(req.user.id).select('-password');
        const newJob = new Job({
            description: req.body.description,
            applyLink: req.body.applyLink,
            name: user.name,
            title: req.body.title,
            company: req.body.company,
            avatar: user.avatar,
            user: req.user.id,
        });
        const job = await newJob.save();
    res.send(job)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
  
});

//  GET api/jobs : Get all the Jobs : Private
router.get('/',auth,  async(req,res) => {
    try {
        const jobs = await Job.find().sort({ date: -1 });
        res.json(jobs)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//  GET api/jobs/:id : Get a particular Job : Private
router.get('/:jobid',auth,  async(req,res) => {
    try {
        const job = await Job.findById(req.params.jobid);
        if(!job){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.json(job)
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.status(500).send('Server Error')
    }
})
//  DELETE api/jobs/:id : Delete a particular Job : Private

router.delete('/:jobid',auth,  async(req,res) => {
    try {
        const job = await Job.findById(req.params.jobid);
        if(!job){
            return res.status(404).json({msg : 'Job not found'})
        }
        //Check if the User owns the post
        if (job.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not Authorized'})
        }
        await job.remove();
        res.json({msg: 'Job Removed'})

    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.status(500).send('Server Error')
    }
})
//  PUT api/jobs/like/:id : Like a particular Job : Private

router.put('/like/:jobid', auth, async(req, res) => {
    try {
        const job = await Job.findById(req.params.jobid);
        if(!job){
            return res.status(404).json({msg : 'Job not found'})
        }
        if (job.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: 'Job has already been liked'})
        }
        job.likes.unshift({user: req.user.id });
        await job.save();
        res.json(job.likes);
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.status(500).send('Server Error')
    }
})
//  PUT api/jobs/unlike/:id : Like a particular Job : Private

router.put('/unlike/:jobid', auth, async(req, res) => {
    try {
        const job = await Job.findById(req.params.jobid);
        if(!job){
            return res.status(404).json({msg : 'Job not found'})
        }
        if (job.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'Job has not been liked'})
        }
        //Get Remove index 
        const removeIndex = job.likes.map(like => like.user.toString()).indexOf(req.user.id);
        job.likes.splice(removeIndex, 1);
        await job.save();
        res.json(job.likes);
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.status(500).send('Server Error')
    }
})

//  POST api/jobs/comment/:jobid : Create a Comment on the Job : Private

router.post('/comment/:jobid', [auth, [
    check('text', 'Text for the Comment is required to Post about it.').not().isEmpty(),
]] , async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const job = await Job.findById(req.params.jobid)
        if(!job){
            return res.status(404).json({msg : 'Job not found'})
        }
        const newComment= {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };
        job.comments.unshift(newComment)
        await job.save()
        res.send(job.comments)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.status(500).send('Server Error')
    }
  
});

//  DELETE api/jobs/comment/:jobid/:commentid : Delete a Comment on the Job : Private
router.delete('/comment/:jobid/:comment_id', auth, async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobid)
        // Pull out the particular comment
        const comment = job.comments.find(comment => comment.id === req.params.comment_id);
        // Make sure comment exists 
        if(!comment){
            res.status(400).json({ msg: 'Comment does not exist'})
        }
        // Check user 
        if (comment.user.toString() !== req.user.id){
            return res.status(401).json({msg : "User is not Authorized to make this action"})
        }
        const removeIndex = job.comments.map(com => com.user.toString()).indexOf(req.user.id);
        console.log(removeIndex)
        job.comments.splice(removeIndex, 1);
        await job.save();
        res.json(job.comments)
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg : 'Job not found'})
        }
        res.status(500).send('Server Error')       
    }
})

module.exports = router;
