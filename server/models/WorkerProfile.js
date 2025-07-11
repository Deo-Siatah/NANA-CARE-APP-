const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    location: {type:String, required:true},
    skills:[String],
    bio: {type:String, maxlength:300},
    photoUrl: {type:String},
    rating: {type:Number, default:0},
    reviewsCount: {type:Number, default:0},
    likes:{type:Number, default:0},
    isAvailable: {type:Boolean,default:true},

}, {timestamps: true});

module.exports = mongoose.model('WorkerProfile',workerProfileSchema);