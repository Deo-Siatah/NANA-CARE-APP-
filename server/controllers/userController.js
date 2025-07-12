const User = require("../models/User");

exports.getUserProfile = async (req,res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");

        if (!user){
            return res.status(404).json({message: "❌ User Not Found "});
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error){
        res.status(500).json({message: "❌Failed to fetch user ",error:error.message});
    }
}

exports.verifyUser = async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {isVerified:true}, {new:true});
        if (!user) return res.status(404).json({message: "User Not Found"});
        res.json({message:"User verified",user});
    } catch (error){
        res.status(500).json({message : "Failed to verify user",error: error.message});
    }
};