const express = require('express');
const {
    getAllAgroChemicals,
    getAgroChemicalById,
    addAgroChemical,
    updateAgroChemical,
    deleteAgroChemical,
    getFileByChemicalId
} = require('../controllers/agroChemicalController');
const upload = require('../config/multerConfig');
const { validateToken } = require('../authUtils');

const router = express.Router();

router.post('/getAllAgroChemicals', validateToken, getAllAgroChemicals);
router.get('/getAgroChemicalById/:id', validateToken,  getAgroChemicalById);
router.post('/addAgroChemical', validateToken, upload.single('image'), addAgroChemical);
router.put('/updateAgroChemical/:id',validateToken,  upload.single('image'), updateAgroChemical);
router.delete('/deleteAgroChemical/:id', validateToken,  deleteAgroChemical);
router.get('/:id/file',validateToken, getFileByChemicalId);
module.exports = router;