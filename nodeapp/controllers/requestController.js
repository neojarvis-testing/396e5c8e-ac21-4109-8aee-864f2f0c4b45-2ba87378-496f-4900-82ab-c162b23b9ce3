const Request = require('../models/requestModel');

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find({})
            .populate('agroChemicalId')
            .populate('cropId')
            .populate('userId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('agroChemicalId')
            .populate('cropId');
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRequestsByUserId = async (req, res) => {
    try {
        const requests = await Request.find({ userId: req.params.userId })
            .populate('agroChemicalId')
            .populate('cropId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRequest = async (req, res) => {
    try {
        await Request.create(req.body);
        res.status(200).json({ message: 'Request Added Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (request) {
            res.status(200).json({ message: 'Request Updated Successfully', request });
        } else {
            res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (request) {
            res.status(200).json({ message: 'Request Deleted Successfully' });
        } else {
            res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
