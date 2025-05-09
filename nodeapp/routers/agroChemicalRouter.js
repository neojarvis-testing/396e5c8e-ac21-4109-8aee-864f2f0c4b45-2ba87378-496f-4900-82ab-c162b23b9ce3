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

router.post('/getAllAgroChemicals',  getAllAgroChemicals);
router.get('/getAgroChemicalById/:id',  getAgroChemicalById);
router.post('/addAgroChemical', upload.single('image'), addAgroChemical);
router.put('/updateAgroChemical/:id',  updateAgroChemical);
router.delete('/deleteAgroChemical/:id',  deleteAgroChemical);
router.get('/:id/file',getFileByChemicalId);
module.exports = router;