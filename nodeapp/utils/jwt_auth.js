const jwt = require('jsonwebtoken');

const SECRET_KEY = 'asdfgewlnclnlhjkl';


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
}


function validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Authentication failed: Token missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Authentication failed: Invalid token' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, validateToken };
