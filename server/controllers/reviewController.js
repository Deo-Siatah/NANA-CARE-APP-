const Review = require("../models/Review");

exports.createReview = async (req,res) => {
try{
    const {stars ,comment,isAnonymous,target } = req.body;

     const review = await Review.create({
        reviewer:req.user.id,
        target,
        stars,
        comment,
        isAnonymous
     });
     res.status(201).json({message: "✅Review posted",review});

} catch (error){
    res.status(500).json({message:"❌Review not posted",error:error.message});
}
   
};

//2.GET all reviews for a user (worker/employer)
exports.getReviewsByTargetUser = async (req,res) => {
    try{
        const {userId } = req.params;

        const reviews = await Review.find({target:userId}).populate("reviewer","name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: "❌Failed to fetch reviews",error:error.message});
    }
};
