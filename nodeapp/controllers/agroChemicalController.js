const createError = require('http-errors');
const AgroChemical = require('../models/agroChemicalModel');
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs');
// Controller to fetch all agrochemicals from the database
// Supports search, sorting, and pagination via query parameters
// Returns a list of agrochemicals and the total count
exports.getAllAgroChemicals = async (req, res, next) => {
    const { search, sort, page = 1, limit = 10 } = req.body;
    const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};
    const sortQuery = sort ? { [sort]: 1 } : {};

    try {
        const agrochemicals = await AgroChemical.find(searchQuery)
            .sort(sortQuery)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await AgroChemical.countDocuments(searchQuery);
        res.status(200).json({ agrochemicals, total });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to fetch a single agrochemical by its ID
// Returns the agrochemical if found, otherwise a 404 error
// Handles server errors with a 500 response
exports.getAgroChemicalById = async (req, res, next) => {
    try {
        const agrochemical = await AgroChemical.findById(req.params.id);
        if (!agrochemical) {
            return res.status(404).json({ message: `Cannot find any agrochemical with ID ${req.params.id}` });
        }
        return res.status(200).json(agrochemical);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to add a new agrochemical to the database
// Accepts agrochemical data in the request body
// Returns a success message or error if creation fails
exports.addAgroChemical = async (req, res, next) => {
    try {
        if (!req.file) { // Fix: Check req.file instead of req.image
            return res.status(400).json({ message: "File is missing" });
        }
        const {name,brand,category,description,unit,price} = req.body;
        const agroChemical = new AgroChemical({
            name,
            brand,
            category,
            description,
            unit,
            price,
            image: {
                filename: req.file.originalname,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });

        await agroChemical.save(); // Fix: Use .save() instead of .create()
        res.status(200).json({ message: 'Agrochemical Added Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to update an existing agrochemical by ID
// Accepts updated data in the request body
// Returns the updated agrochemical or a 404 if not found
exports.updateAgroChemical = async (req, res, next) => {
    try {
        const agrochemical = await AgroChemical.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!agrochemical) {
            return res.status(404).json({ message: `Cannot find any agrochemical with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Agrochemical Updated Successfully', agrochemical });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to delete an agrochemical by ID
// Removes the agrochemical from the database if it exists
// Returns a success or not-found message accordingly
exports.deleteAgroChemical = async (req, res, next) => {
    try {
        console.log(req);
        const agrochemical = await AgroChemical.findByIdAndDelete(req.params.id);
        if (!agrochemical) {
            return res.status(404).json({ message: `Cannot find any agrochemical with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Agrochemical Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getFileByChemicalId = async (req,res,next) => {
    try {
        const {id} = req.params;
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(req.params?.id)) throw createError(`Agrochemical Id ${req.params?.id} is invalid`);
        const chemical = await AgroChemical.findById(id);
        if (!chemical) return res.status(404).json({message:"Image not found"});
        const file = chemical.image;
        const filepath  = path.resolve(__dirname, '..', file.path)
        if(!fs.existsSync(filepath)){
            return res.status(404).json({message:"Image not found"});
        }
        return res.sendFile(filepath,{headers:{'Content-Type':file.mimetype}});
    } catch (error) {
        next(error);
    }
}