const mongoose = require('mongoose');

const AgroChemicalSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    description: String,
    unit: String,
    price: Number,
    image: {
      filename: String,
      path: String,
      mimetype: String,
      size: Number
    }
  });
  

module.exports = mongoose.model('AgroChemical', AgroChemicalSchema);