require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

module.exports.userVerification = async(req,res,next)=>{

    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(400).json({message: "token not found", status:false});
    }
    
    let user;
    try{
        user=jwt.verify(token,process.env.TOKEN_KEY);
    }catch(error){
        return res.status(401).json({status:false, message: "Invalid token"})
    }
    console.log(user);
    try{
        user= await User.findById(user.id);
        console.log(user);
        if(!user){
            return res.status(401).json({message:"User not found",status:false})
        }
        req.user=user;
        next();
        //res.json({status:true, message:"profile saved successfully"});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Invalid token", status: false});
    }
    
}