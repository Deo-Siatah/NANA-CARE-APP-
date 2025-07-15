const express = require("express");
const router = express.Router();
const {createReview,getReviewsByTargetUser} = require("../controllers/reviewController");
const {protect}= require("../middleware/authMiddleware");

router.post("/",protect,createReview);
router.get("/target/:userId",getReviewsByTargetUser);

module.exports = router;