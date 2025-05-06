const express = require('express');
const {
    getAllRequests,
    getRequestById,
    getRequestsByUserId,
    addRequest,
    updateRequest,
    deleteRequest
} = require('../controllers/requestController');
// const { validateToken } = require('../authUtils');

const router = express.Router();

// router.get('/getAllRequests', validateToken, getAllRequests);
// router.get('/getRequestById/:id', validateToken, getRequestById);
// router.get('/getRequestByUserId/:userId', validateToken, getRequestsByUserId);
// router.post('/addRequest', validateToken, addRequest);
// router.put('/updateRequest/:id', validateToken, updateRequest);
// router.delete('/deleteRequest/:id', validateToken, deleteRequest);

router.get('/getAllRequests', getAllRequests);
router.get('/getRequestById/:id', getRequestById);
router.get('/getRequestByUserId/:userId', getRequestsByUserId);
router.post('/addRequest', addRequest);
router.put('/updateRequest/:id', updateRequest);
router.delete('/deleteRequest/:id', deleteRequest);

module.exports = router;