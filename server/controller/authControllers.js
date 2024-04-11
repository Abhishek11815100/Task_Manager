const User = require('../model/userModel');
const {createSecretToken} = require('../utils/SecretToken')
const bcrypt = require('bcrypt');

module.exports.SignUp = async (req,res,next)=> {
    try{
        const {email,username,password,createdDate} = req.body;
        if(!email||!username||!password){
            return res.json({message: "All fields required", success: false})
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({message: "Email already registered", success: false});
        }
        const user = await User.create({email,username,password,createdDate});
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true
        })
        res
            .status(201)
            .send({message: "User created Successfully", success: true});

        next();
    }
    catch(err){
        console.log({message: "Error occured creating user"})
    }
}

module.exports.Login = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.json({message: "All fields required"})
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.json({message:"Email id is not registered", success: false});
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({message:"Incorrect Email  or Password",success: false});
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true
        })
        res
            .status(201)
            .send({message: "Logged In successfully", success: true, user, token});
        next();
    }catch(err){
        return res.json({message:"Error occured while logging In"});
    }
}