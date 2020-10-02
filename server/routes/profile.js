const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const config = require('config');
const {check, validationResult} = require('express-validator') // Custom Validation

const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

// @route   Get api/profile/me
// @desc    Get Current User Profile
// @access  Profile
router.get('/me',auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        
        if(!profile)
            return res.status(400).json({msg: 'There is No Profile For This User'});

        return res.status(200).json(profile);
    }  catch(error) {
        console.log(error);
        return res.status(500).send({msg: 'Searver Error'})
    } 
});

// @route   Get api/profile/
// @desc    Create Or Update Profile
// @access  Profile
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) 
        return res.status(400).json({errors: errors.array()});
    
    const {company, website, location, bio, status, github,skills, youtube, facebook, twitter, instagram, linkedin} = req.body;
    
    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(github) profileFields.github = github;
    if(skills) profileFields.skills = skills.split(',').map(item => item.trim());

    // Social Object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({user: req.user.id});
        // Update Profile If Already Exists
        if(profile) {
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            return res.status(201).json(profile)
        }

        //Create Profile If not Exists
        profile = new Profile(profileFields);
        await profile.save();
        return res.status(201).json(profile)
    } catch(error) {
        console.log(error);
        return res.status(500).json({msg:'Server Error'});
    }
   
})

// @route   Get api/profile/
// @desc    Get All Profile
// @access  Public
router.get('/', async(req, res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        return res.status(200).json(profiles);
    } catch(error) {
        console.log(error);
        return res.status(400).json({msg:'Server Error'});
    }
})

// @route   Get api/profile/user/userid
// @desc    Get All Profile
// @access  Public
router.get('/user/:user_id', async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name','avatar']);
        if(!profile)
            return res.status(400).json({msg: 'Profile Not Found'});
        return res.status(200).json(profile);
    } catch(error) {
        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile Not Found'});
        }
        return res.status(400).json({msg:'Server Error'});
    }
})


// @route   DELETE api/profile
// @desc    Delete Profile And User
// @access  Public
router.delete('/', auth, async(req, res) => {
    try{
        // Remove Post
        await Post.deleteMany({user: req.user.id})

        // Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        
        // Remove User
        await User.findOneAndRemove({_id: req.user.id});

        return res.status(200).json({msg: 'User Deleted'});
    } catch(error) {
        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile Not Found'});
        }
        return res.status(400).json({msg:'Server Error'});
    }
})


// @route   Update api/profile/experience
// @desc    Add Profile Experience
// @access  Public
router.put('/experience', [auth, [
    check('title', 'Title Name is required').not().isEmpty(),
    check('company', 'Company Name is required').not().isEmpty(),
    check('location', 'location Name is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors) return res.status(400).json({errors: errors.array()});

    const{title, company, location, from, to, current, description} = req.body;
    const experience = {title, company, location, from, to, current, description}

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(experience);
        await profile.save();

        res.status(201).json(profile);
    } catch(error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
})


// @route   DELETE api/profile/experience/id
// @desc    Delete Profile And User
// @access  Public
router.delete('/experience/:exp_id', auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});
        
        //Get Remove Index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        if(removeIndex == -1) throw Error('ObjectId'); 
        profile.experience.splice(removeIndex,1);
        await profile.save();

        return res.status(200).json(profile);
    } catch(error) {
        if(error.message == 'ObjectId') {
            return res.status(400).json({msg: 'Experience Not Found'});
        }
        return res.status(400).json({msg:'Server Error'});
    }
})


// @route   Update api/profile/Eduction
// @desc    Add Profile Eduction
// @access  Public
router.put('/education', [auth, [
    check('school', 'School Name is required').not().isEmpty(),
    check('degree', 'Degree Name is required').not().isEmpty(),
    check('fieldofstudy', 'Field Name is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors) return res.status(400).json({errors: errors.array()});

    const{school, degree, fieldofstudy, from, to, current, description} = req.body;
    const education = {school, degree, fieldofstudy, from, to, current, description}

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(education);
        await profile.save();

        res.status(201).json(profile);
    } catch(error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
})


// @route   DELETE api/profile/education/id
// @desc    Delete Profile Education
// @access  Public
router.delete('/education/:edu_id', auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});
        
        //Get Remove Index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        if(removeIndex == -1) throw Error('ObjectId'); 
        profile.education.splice(removeIndex,1);
        await profile.save();

        return res.status(200).json(profile);
    } catch(error) {
        if(error.message == 'ObjectId') {
            return res.status(400).json({msg: 'Education Not Found'});
        }
        return res.status(400).json({msg:'Server Error'});
    }
})


// @route   GET api/profile/github/:username
// @desc    Get User Repo from Github
// @access  Public
router.get('/github/:username', async(req, res) => {
    try {
        const option = {
            uri: `https://api.github.com/users/${req.params.username}/repos?
                per_page=5&
                sort=created:asc&
                client_id=${config.get('githubid')}&
                client_secret=${config.get('githubSecret')}`,
            method: `GET`,
            headers: {'User-Agent': 'node.js'}
        };

        // Get Repo From Git-Hub
        request(option, (error, response, body) => {
            if(error) console.error(error);
            if(response.statusCode !== 200) return res.status(404).json({msg: 'User Name Not Found'});

            return res.status(200).json(JSON.parse(body));
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
})
module.exports = router;