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

router.get('/getAllCrops', getAllCrops);
router.get('/getCropById/:id', getCropById);
router.get('/user/getCropByUserId/:userId', getCropsByUserId);
router.post('/addCrop', addCrop);
router.put('/updateCrop/:id', updateCrop);
router.delete('/deleteCrop/:id', deleteCrop);
module.exports = router;