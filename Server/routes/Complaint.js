const express = require("express");
const router = express.Router();

const {
	getOneComplaint,
	getComplaint,
	addComplaint,
	updateComplaint,
	deleteComplaint,
	getComplaintByUserId,
	updateComplaintStatus,
	sendMsgComplaint,
	getComplaintByUserIdAndStatus,
	getComplaintByStatus
} = require("../controllers/complaintController");

//send messages
router.patch("/send_msg/:id",sendMsgComplaint);
//Update status
router.patch('/update_status/:id', updateComplaintStatus);
//DONE ADD
router.post("/addComplaint", addComplaint);
//DONE UPDATE SHOULD enter the id filed
router.put("/updateComplaint/:id", updateComplaint);

router.delete("/deleteComplaint/:id", deleteComplaint);
//DONE GET ALL
router.get("/getComplaints", getComplaint);
//DONE GET One
router.get("/getOneComplaint/:id", getOneComplaint);

router.get("/getComplaintByUserId/:id", getComplaintByUserId);

router.get("/getComplaintByStatus/:status", getComplaintByStatus);

router.get("/getComplaintByUserIdAndStatus/:id/status", getComplaintByUserIdAndStatus);

module.exports = router;
