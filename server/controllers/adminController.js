const User = require("../models/User");
const Review = require("../models/Review");

//GET all users (for dashboard)'
exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "❌Failed to fetch users",error: error.message});
    }
};

exports.getFlaggedReviews = async (req, res) => {
  try {
    const flagged = await Review.find({ flagged: true }).populate("reviewer", "name");
    res.status(200).json(flagged);
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to fetch flagged reviews", error: error.message });
  }
};