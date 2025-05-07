const express = require('express');
const {
    getAllCrops,
    getCropById,
    getCropsByUserId,
    addCrop,
    updateCrop,
    deleteCrop
} = require('../controllers/cropController');
const { validateToken } = require('../authUtils');

const router = express.Router();

router.get('/getAllCrops', validateToken, getAllCrops);
router.get('/getCropById/:id', validateToken, getCropById);
router.get('/user/getCropByUserId/:userId', validateToken, getCropsByUserId);
router.post('/addCrop', validateToken, addCrop);
router.put('/updateCrop/:id', validateToken, updateCrop);
router.delete('/deleteCrop/:id', validateToken, deleteCrop);
module.exports = router;