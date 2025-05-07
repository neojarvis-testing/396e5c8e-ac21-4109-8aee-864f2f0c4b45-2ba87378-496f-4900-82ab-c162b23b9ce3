const express = require('express');
const {
    getAllAgroChemicals,
    getAgroChemicalById,
    addAgroChemical,
    updateAgroChemical,
    deleteAgroChemical
} = require('../controllers/agroChemicalController');
// const { validateToken } = require('../authUtils');

const router = express.Router();

// router.get('/getAllAgroChemicals', validateToken, getAllAgroChemicals);
// router.get('/getAgroChemicalById/:id', validateToken, getAgroChemicalById);
// router.post('/addAgroChemical', validateToken, addAgroChemical);
// router.put('/updateAgroChemical/:id', validateToken, updateAgroChemical);
// router.delete('/deleteAgroChemical/:id', validateToken, deleteAgroChemical);

router.get('/getAllAgroChemicals', getAllAgroChemicals);
router.get('/getAgroChemicalById/:id', getAgroChemicalById);
router.post('/addAgroChemical', addAgroChemical);
router.put('/updateAgroChemical/:id', updateAgroChemical);
router.delete('/deleteAgroChemical/:id', deleteAgroChemical);

module.exports = router;