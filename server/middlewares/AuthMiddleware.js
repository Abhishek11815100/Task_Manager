require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

module.exports.userVerification = (req,res)=>{

    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.json({message: "token not found", status:false});
    }
    jwt.verify( token, process.env.TOKEN_KEY, async(err,data)=>{
        if(err){
            res.json({message:"Error while verifying", status: false});
        }else{
            const user = await User.findById(data.id)
            if (user) return res.json({message:"User is verified", status: true, user: user.username })
            else return res.json({ message: "Server error", status: false })
        }
    })
}