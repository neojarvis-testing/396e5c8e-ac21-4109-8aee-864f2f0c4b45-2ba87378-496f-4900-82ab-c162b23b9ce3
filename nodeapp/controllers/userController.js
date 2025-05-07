
const User = require('../models/userModel');
const { generateToken } = require('../authUtils');

exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            const token = generateToken(user._id);
            res.status(200).json({
                userName: user.userName,
                role: user.role,
                token,
                id: user._id
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};