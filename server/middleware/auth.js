const jwt = require('jsonwebtoken')
const User = require('../models/User');

const config = require('config')

module.exports = async(req, res, next) => {
    const token = req.header('x-auth-token');

    if(token) {
        try{
            const decode = jwt.verify(token, config.get('jwtToken'));
            const user = await User.findById(decode.user.id)
            if(user){
                req.user = decode.user;
                next();
            } else 
                return res.status(401).json({msg: 'Please Login...'});    
                
        } catch(error) {
            return res.status(401).json({msg: 'Please Login...'});
        }
    } else {
        return res.status(401).json({msg:'Please Login..'});
    }
}