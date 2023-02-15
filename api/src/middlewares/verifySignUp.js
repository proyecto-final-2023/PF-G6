const jwt = require('jsonwebtoken');
const config = require('../../config')
const { User } = require("../db");

 const verifyToken = async (req, res, next)=>{
    const token= req.headers["x-access-token"];
    if(!token) return res.status(403).json({message: "no token provider"});

    const decoded = jwt.verify(token, config.SECRET)
    //const user= await User.findById
    next();
}

module.exports = {verifyToken};