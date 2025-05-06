const mongoose = require('mongoose');

const agroChemicalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    image:{
        type:String,
        required:true
    }
},{ timestamps: true });

const AgroChemical = mongoose.model('AgroChemical',agroChemicalSchema);
module.exports = AgroChemical;