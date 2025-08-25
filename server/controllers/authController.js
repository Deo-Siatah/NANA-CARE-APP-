const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

//signup
exports.signup = async (req,res) => {
    try{

    
    const {name,email,password} = req.body;
    //check if user already exists by email
    const emailExists = await User.findOne({email}).select("password role name").lean();
    if (emailExists) return res.status(400).json({message: "Email already exists"});

    const usernameExists = await User.findOne({name}).lean();
    if (usernameExists) return res.status(400).json({message: "username already exists"})

    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password: hashed});

    const token = jwt.sign({id: user._id, role:user.role,name:user.name}, process.env.JWT_SECRET,{
        expiresIn:'1h'
    })
    res.status(201).json({token, message: "Signup successful"});
}  catch (error){
    res.status(500).json({message: "Signup failed", error: error.message})
}
}

//login logic 

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        
        const user = await User.findOne({email}).lean();
    
        if (!user) return res.status(404).json({message: "User Not Found"});

        const match = await bcrypt.compare(password,user.password);
        if (!match) return res.status(401).json({message: "Incorrect password"});

        const token = jwt.sign({
            id:user._id,role:user.role
        }, process.env.JWT_SECRET,{
            expiresIn: "1h"
        });
        res.json({token});
        
    }  catch (error) {
        res.status(500).json({message: "Login failed",error: error.message})
    }
};
