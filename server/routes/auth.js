const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator') // Custom Validation

const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   Get api/auth/
// @desc    GET USER
// @access  Public
router.get('/',auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.status(201).json(user);
    } catch(error) {
        console.error(error);
        return res.status(500).json({error: [{msg: 'Server Error'}]});
    }
});

// @route   Post api/auth/
// @desc    Login User and Get Token
// @access  Public
router.post('/',[
    check('email', 'Invalid Email Address').isEmail(),
    check('password', 'Invalid Password').isLength({min:3})
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    
        return res.status(400).json({errors: errors.array()});

    const{email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) 
            return res.status(404).json({msg: 'User Not Found'});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(404).json({msg: 'Email Or Password Not Valid'});

        //Create Token 
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtToken'),
            {expiresIn: 3600000},
            (error, token) => {
                if(error) throw error;
                res.status(201).json({user,token});
            }
        )        
    } catch(error) {
        console.error(error);
        return res.status(500).json({error: [{msg: 'Server Error'}]});
    }
})


module.exports = router;