
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);