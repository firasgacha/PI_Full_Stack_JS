const express = require ('express');
const router = express.Router();


const {
    getOneComplaint,
    getComplaint,
    addComplaint,
    updateComplaint,
    deleteComplaint
}= require ('../controllers/Complaint.js')

router.get('/addComplaint',addComplaint);
router.get('/updateComplaint/:id',updateComplaint);
router.get('/deleteComplaint/:id',deleteComplaint);
router.get('/getComplaints',getComplaint);
router.get('/getOneComplaint/:id',getOneComplaint);

module.exports = router;

