
const mongoose = require('mongoose');

const AgroChemicalSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    brand: {
      type:String,
      required:true
    },
    category: {
      type:String,
      required:true
    },
    description: {
      type:String,
      required:true
    },
    unit: {
      type:String,
      required:true
    },
    price: {
      type:Number,
      required:true
    },
    image: {
      filename: String,
      path: String,
      mimetype: String,
      size: Number
    }
  });
  

module.exports = mongoose.model('AgroChemical', AgroChemicalSchema);