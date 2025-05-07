const createError = require('http-errors');
const User = require('../models/userModel');
const { generateToken } = require('../authUtils');

// Controller to authenticate a user using email and password
// If valid, returns user details along with a generated token
// Returns 404 if user is not found or credentials are incorrect
exports.getUserByEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return next(createError(404, 'User not found or incorrect credentials'));
        }

        const token = generateToken(user._id);
        res.status(200).json({
            userName: user.userName,
            role: user.role,
            token,
            id: user._id
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Controller to add a new user to the database
// Accepts user data in the request body
// Returns a success message or error if creation fails
exports.addUser = async (req, res, next) => {
    try {
        console.log("in add user");
        await User.create(req.body);
        res.status(201).json({ message: 'Success' });
    } catch (error) {
        next(createError(500, error.message));
    }
};