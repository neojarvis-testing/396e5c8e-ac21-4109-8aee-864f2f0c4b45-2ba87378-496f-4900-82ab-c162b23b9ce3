const mongoose = require('mongoose');

const AgroChemicalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    unit: { type: String, required: true },
    pricePerUnit: { type: mongoose.Types.Decimal128, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('AgroChemical', AgroChemicalSchema);