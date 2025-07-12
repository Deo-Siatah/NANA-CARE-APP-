const express = require("express");
const router = express.Router();
const {createTraining,getAllTrainings} = require("../controllers/trainingController");
const {protect,requireAdmin} = require("../middleware/authMiddleware");

router.post("/",protect,requireAdmin,createTraining);
router.get("/",getAllTrainings);

module.exports = router;