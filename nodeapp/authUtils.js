// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// const validateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//         return res.status(400).json({ message: 'Authentication failed' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch (err) {
//         return res.status(400).json({ message: 'Authentication failed' });
//     }
// };

// module.exports = { generateToken, validateToken };

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'asdfgewlnclnlhjkl';

exports.generateToken = (userId) => {
    return jwt.sign({userId}, SECRET_KEY, { expiresIn: '1h' });
};

exports.validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Authentication failed' });
    }
};
