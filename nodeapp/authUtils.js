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
