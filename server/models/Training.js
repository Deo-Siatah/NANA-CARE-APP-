const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    name:{type:String, required:true},
    date:{type:Date, required:true},
    location:{type:String, required:true},
    description: {type:String},
    imageUrl:{type:String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},

},{timestamps: true});

module.exports = mongoose.model('Training',trainingSchema);