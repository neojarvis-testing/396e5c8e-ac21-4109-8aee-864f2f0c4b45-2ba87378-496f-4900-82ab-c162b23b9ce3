const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    agroChemicalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AgroChemical',
        required:true
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cropId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Crop',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    requestDate:{
        type:Date,
        required:true
    }


},{timestamps:true})

const Request = mongoose.model('Request',requestSchema);
module.exports = Request;

