const express = require('express');
const {
    getAllAgroChemicals,
    getAgroChemicalById,
    addAgroChemical,
    updateAgroChemical,
    deleteAgroChemical
} = require('../controllers/agroChemicalController');
const { validateToken } = require('../authUtils');
const upload = require('../config/multerConfig')

const router = express.Router();

router.get('/getAllAgroChemicals', validateToken, getAllAgroChemicals);
router.get('/getAgroChemicalById/:id', validateToken, getAgroChemicalById);
router.post('/addAgroChemical', upload.single('image') ,addAgroChemical);
router.put('/updateAgroChemical/:id', validateToken, updateAgroChemical);
router.delete('/deleteAgroChemical/:id', validateToken, deleteAgroChemical);

module.exports = router;