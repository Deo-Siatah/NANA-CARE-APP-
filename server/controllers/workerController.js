const Worker = require("../models/WorkerProfile");

//create workerProfile
exports.createWorkerProfile = async (req,res) => {
    try{
        const {location, skills, bio, photoUrl} = req.body;
        const workerProfile = await Worker.create({
        user:req.user.id,
        location,
        skills,
        bio,
        photoUrl
    });
     res.status(201).json({message: "✅ Profile created successfully",workerProfile})

    } catch (error){
        res.status(500).json({message:"❌Profile not created",error:error.message});
    }
} 

//getAllWorkers
exports.getAllWorkers = async (req,res) => {
    try{
        const workers = await Worker.find().populate("user","name email");
        res.status(200).json(workers);
    } catch (error){
        res.status(500).json({message: "❌Failed to get workers",error:error.message});
    }
};

//get worker by ID 
exports.getWorkerById = async (req,res) => {
    try{
        const worker = await Worker.findById(req.params.id).populate("user","name email");

        if (!worker) return res.status(404).json({ message: "❌worker not found"})
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({message: "❌Failed to load worker",error:error.message});
    }
};

//updateWorkerProfile
exports.updateWorkerProfile = async (req,res) =>{
    try{
        const worker = await Worker.findById(req.params.id);

        if(!worker) return res.status(404).json({message: "❌User not found"});

        if (worker.user.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized to update this user"});
        }

        const updateWorker = await Worker.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        res.status(200).json({message: "✅ worker profile updated",updateWorker});
    } catch (error) {
        res.status(500).json({message: "❌ Failed to update worker profile",error:error.message});
    }
};

//deleteWorkerProfile
exports.deleteWorkerProfile = async (req,res) => {
    try{
        const worker = await Worker.findById(req.params.id);
        if (!worker){
            return res.status(404).json({message: "❌ Worker not found"});
        }

        if (worker.user.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({message: "Not authorized to delete profile"});
        }
        
        await Worker.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "✅ worker profile deleted"});
    } catch (error){
        res.status(500).json({message:"❌Failed to delete worker profile",error:error.message});
    }
};