const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({message:'Authentication failed'});
            //next(createError(400,'Missing or malformed token'));
        }
        const token = authHeader.substring(7);
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(400).json({message:'Authentication failed'});
        //res.status(500).json({message:error.message});
        //next(error);
    }
};

module.exports = { generateToken, validateToken };


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
