const express = require("express");
const router = express.Router();
const {
    createWorkerProfile,
    getAllWorkers,
    getWorkerById,
    updateWorkerProfile,
    deleteWorkerProfile
} = require("../controllers/workerController");
const {protect} = require("../middleware/authMiddleware");

router.post("/",protect,createWorkerProfile);
router.get("/",getAllWorkers);
router.get("/user/:userId",getWorkerById);
router.patch("/:id",protect,updateWorkerProfile);
router.delete("/:id",protect,deleteWorkerProfile);

module.exports = router;