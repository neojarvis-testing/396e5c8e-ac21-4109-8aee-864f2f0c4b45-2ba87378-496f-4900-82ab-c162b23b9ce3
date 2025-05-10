const express = require('express');
const {
    getAllRequests,
    getRequestById,
    getRequestsByUserId,
    addRequest,
    updateRequest,
    deleteRequest
} = require('../controllers/requestController');
const { validateToken } = require('../authUtils');

const router = express.Router();

router.get('/getAllRequests', getAllRequests);
router.get('/getRequestById/:id',  getRequestById);
router.get('/getRequestByUserId/:userId',  getRequestsByUserId);
router.post('/addRequest',  addRequest);
router.put('/updateRequest/:id',  updateRequest);
router.delete('/deleteRequest/:id', deleteRequest);


module.exports = router;