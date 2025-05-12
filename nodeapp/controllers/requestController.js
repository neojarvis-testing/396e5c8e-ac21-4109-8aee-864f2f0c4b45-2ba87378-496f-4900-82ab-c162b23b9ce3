const createError = require('http-errors');
const Request = require('../models/requestModel');
const transport = require('../mailTransport');
const User = require('../models/userModel');


// Controller to fetch all requests from the database
// Populates related agrochemical, crop, and user data
// Returns a list of all requests with full details
exports.getAllRequests = async (req, res, next) => {
    try {
        const requests = await Request.find({})
            .populate('agroChemicalId')
            .populate('cropId')
            .populate('userId');
        res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to fetch a single request by its ID
// Populates related agrochemical and crop data
// Returns the request if found, otherwise a 404 error
exports.getRequestById = async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('agroChemicalId')
            .populate('cropId');
        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
        res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to fetch all requests made by a specific user
// Uses userId from request parameters to filter results
// Populates related agrochemical and crop data
exports.getRequestsByUserId = async (req, res, next) => {
    try {
        const requests = await Request.find({ userId: req.params.userId })
            .populate('agroChemicalId')
            .populate('cropId');
        res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to add a new request to the database
// Accepts request data in the request body
// Returns a success message or error if creation fails
exports.addRequest = async (req, res, next) => {
    try {
        const {agroChemicalId,userId,cropId,quantity,status,requestDate} = req.body;
        await Request.create({agroChemicalId,userId,cropId,quantity,status,requestDate});
        res.status(201).json({ message: 'Request Added Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to update an existing request by ID
// Accepts updated data in the request body
// Returns the updated request or a 404 if not found
exports.updateRequest = async (req, res, next) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
        const user = await User.findById(request.userId);
        if (!user) {
            return res.status(404).json({ message: "User associated with this request not found" });
        }

        // Email content based on status
        let subject, message;
        if (request.status === 'approved') {
            subject = "Your Request has been Approved!";
            message = `<p>Hello ${user.userName},</p><p>Good news! Your request for agrochemical has been <strong>approved</strong>.</p><p>Thank you for using our service.</p>`;
        } else if (request.status === 'rejected') {
            subject = "Your Request has been Rejected";
            message = `<p>Hello ${user.userName},</p><p>Unfortunately, your request for agrochemical has been <strong>rejected</strong>.</p><p>Contact support for assistance.</p>`;
        }
        console.log(user);
        console.log(message);
        // Send email
        await transport.sendMail({
            from: `"AgroLink" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: subject,
            html: message
        });
        res.status(200).json({ message: 'Request Updated Successfully and Email Sent', request });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to delete a request by ID
// Removes the request from the database if it exists
// Returns a success or not-found message accordingly
exports.deleteRequest = async (req, res, next) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Request Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
