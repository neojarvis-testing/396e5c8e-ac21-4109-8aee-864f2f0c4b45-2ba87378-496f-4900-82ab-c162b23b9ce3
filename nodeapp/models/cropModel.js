const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    cropName: { type: String, required: true },
    cropType: { type: String, required: true },
    description: { type: String, required: true },
    plantingDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Crop', CropSchema);