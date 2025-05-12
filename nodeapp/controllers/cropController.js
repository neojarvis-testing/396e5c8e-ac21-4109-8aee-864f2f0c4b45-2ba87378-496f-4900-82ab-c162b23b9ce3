const createError = require('http-errors');
const Crop = require('../models/cropModel');

// Controller to fetch all crops from the database
// Supports search, sorting, and pagination via query parameters
// Returns a list of crops and the total count
exports.getAllCrops = async (req, res, next) => {
    console.log("Jeee")
    const { search, sort, page = 1, limit = 10 } = req.query;
    const searchQuery = search ? { cropName: { $regex: search, $options: 'i' } } : {};
    const sortQuery = sort ? { [sort]: 1 } : {};

    try {
        const crops = await Crop.find(searchQuery)
            .sort(sortQuery)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Crop.countDocuments(searchQuery);
        res.status(200).json({ crops, total });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to fetch a single crop by its ID
// Returns the crop if found, otherwise a 404 error
// Handles server errors with a 500 response
exports.getCropById = async (req, res, next) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ message: `Cannot find any crop with ID ${req.params.id}` });
        }
        res.status(200).json(crop);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to fetch all crops associated with a specific user
// Uses the userId from the request parameters to filter crops
// Returns a list of crops belonging to the user
exports.getCropsByUserId = async (req, res, next) => {
    try {
        console.log("inside getCropsByUserId");
        const crops = await Crop.find({ userId: req.params.userId });
        console.log(crops);
        res.status(200).json(crops);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to add a new crop to the database
// Accepts crop data in the request body
// Returns a success message or error if creation fails
exports.addCrop = async (req, res, next) => {
    try {
        await Crop.create(req.body);
        res.status(200).json({ message: 'Crop Added Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to update an existing crop by ID
// Accepts updated data in the request body
// Returns the updated crop or a 404 if not found
exports.updateCrop = async (req, res, next) => {
    try {
        const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!crop) {
            return res.status(404).json({ message: `Cannot find any crop with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Crop Updated Successfully', crop });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to delete a crop by ID
// Removes the crop from the database if it exists
// Returns a success or not-found message accordingly
exports.deleteCrop = async (req, res, next) => {
    try {
        const crop = await Crop.findByIdAndDelete(req.params.id);
        if (!crop) {
            return res.status(404).json({ message: `Cannot find any crop with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Crop Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};