require('dotenv').config();
const User = require('../models/userModel');
const { generateToken, resetToken } = require('../authUtils');
const createError = require('http-errors');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const transport = require('../mailTransport');
const mongoose = require('mongoose');

// Controller to authenticate a user using email and password
// If valid, returns user details along with a generated token
// Returns 404 if user is not found or credentials are incorrect
exports.getUserByEmailAndPassword = async (req, res, next) => {
    try {
        let { email } = req.body;
        email = email.toString();
        if(!validator.isEmail(email)) throw createError(400, `Invalid EMAIL ID: ${email}`)
        const user = await User.findOne({email:sanitizeHtml(email)});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            userName: user.userName,
            role: user.role,
            token,
            id: user._id
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to add a new user to the database
// Accepts user data in the request body
// Returns a success message or error if creation fails
exports.addUser = async (req, res, next) => {
    try {
        let {userName,email,password,role,mobile} = req.body;
        userName = userName.toString();
        email = email.toString();
        password = password.toString();
        role=role.toString();
        mobile = mobile.toString();
        if(!validator.isEmail(email)) throw createError(400, `Invalid EMAIL ID: ${email}`)
        await User.create({userName,email,password,role,mobile});
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



exports.forgotPassword = async (req, res, next) => {
    try {
        let { email } = req.body;
        email=email.toString();
        const user = await User.findOne({ email: mongoose.escape(email) });
        if (!user) throw createError(404, `No user found with EMAIL ID: ${email}`);
        const payload = {
            id: user._id,
            name: user.userName,
            email: user.email,
            role: user.role
        }
        const token = resetToken(payload);
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();
        await transport.sendMail({
            from: `AgroLink <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: `
        <p>Hello, ${user.userName}</p>
        <h3>We received a request to reset your password. If you did not request a password reset,please contact us.</h3>
        <p><strong>Important:</strong> This link will expire in 15 minutes for your security.</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${token}" style="
        background-color:blue;
        color:white;
        text-align:center;
        display:inline-block;
        font-size:16px;
        border-radius: 4px;        
        ">Reset Password</a>
        <p>If you have any questions or need assistance, feel free to contact our support team</p>
        <p>Thanks, <br> Agrolink Team</p>
        `
        })
        return res.status(200).json({ message: 'Password reset link sent' });

    } catch (error) {
        next(error);
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const {newPassword,token} = req.body;
        const user = await User.findOne({ resetToken: token.toString() });
        if (!user) throw createError(400, 'Invalid token');
        if (Date.now() > user.resetTokenExpiry) throw createError(400, 'Token expired');
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        return { message: 'Password reset successful!' }
    } catch (error) {
        next(error);
    }
}