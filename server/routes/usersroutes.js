const express = require("express");
const router = express.Router();
const {getUserProfile,verifyUser} = require("../controllers/userController");
const {protect,requireAdmin} = require("../middleware/authMiddleware");

router.get("/profile/:id",protect,getUserProfile);
router.patch("/verify/:id",protect,requireAdmin,verifyUser);

module.exports = router;