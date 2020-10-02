const express = require('express');
const router = express.Router(); // Create Router
const {check, validationResult} = require('express-validator') // Custom Validation
const bcrypt = require('bcryptjs'); // Encrypt
const jwt = require('jsonwebtoken'); // Json Web Token
const config = require('config') // Get All Json File Object

const User = require('./../models/User');
const gravatar = require('gravatar');

// @route   Post api/users 
// @desc    Register User
// @access  Public
router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email Is Invalid').isEmail(),
    check('password', 'Password Minimum 6 Character Required.').isLength({min: 3})
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } else {
        try {
            let {name, email, password} = req.body;
            let user = await User.findOne({email})
            if(user) {
                res.status(400).json({errors: [{msg:'Email Address Already Exists'}]});
            } else {
                // Encrypt Password 
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                // Creating Avatar
                const avatar = gravatar.url(email, {
                    s: '200', // Size
                    r: 'pg', 
                    d: 'mm' // default image  
                })
                // Create User
                const user = new User({
                    name, 
                    email,
                    password,
                    avatar
                });
                await user.save();
                // Create Token
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(
                    payload,
                    config.get('jwtToken'),
                    {expiresIn: 3600000},
                    (error, token) => {
                        if(error) throw error;
                        res.status(200).json({user, token});
                    })
            } 
        } catch(error) {
            console.error(error);
            res.status(500).json({error: [{msg: 'Server Error'}]});
        }
    }
});

module.exports = router;