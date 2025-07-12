const express = require("express");
const router = express.Router();
const {getAllUsers,getFlaggedReviews} = require("../controllers/adminController");
const {protect,requireAdmin} = require("../middleware/authMiddleware")

router.get("/users",protect,requireAdmin,getAllUsers);
router.get("/flagged-reviews",protect,requireAdmin,getFlaggedReviews);

module.exports = router;