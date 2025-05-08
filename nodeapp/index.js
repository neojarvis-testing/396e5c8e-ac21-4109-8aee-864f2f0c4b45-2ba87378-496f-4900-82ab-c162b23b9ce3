require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const logger = require('./loggers/logger');
const userRoutes = require('./routers/userRouter');
const cropRoutes = require('./routers/cropRouter');
const agroChemicalRoutes = require('./routers/agroChemicalRouter');
const requestRoutes = require('./routers/requestRouter');

const app = express();

app.set('trust proxy', 1);

// Rate Limiter: Limits each IP to 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
    headers: true
});

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/user', userRoutes);
app.use('/crop', cropRoutes);
app.use('/agroChemical', agroChemicalRoutes);
app.use('/request', requestRoutes);

mongoose.set('strictQuery', true).connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        logger.info('Connected to MongoDB');
        app.listen(8080, () => {
            logger.info(`Server is running on port: 8080`);
        });
    })
    .catch(err => {
        logger.error(`Failed to connect to MongoDB: ${err.message}`);
    });

app.use((err, _req, res, _next) => {
    logger.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});