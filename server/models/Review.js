const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewer:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    target: {type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    stars : {type:Number, min:1, max:5 , required:true},
    comment: {type:String},
    isAnonymous:{type: Boolean , default: false},
}, {timestamps: true});

module.exports = mongoose.model('Review',reviewSchema);