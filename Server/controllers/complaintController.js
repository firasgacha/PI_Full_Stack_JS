const mongoose = require("mongoose");
const Complaint = require("../models/complaint.model");

module.exports = {
	getComplaintByUserId: async(req, res) => {
		const { id } = req.params;
		Complaint.find({ userId: id})
			.then((data) => {
				res.status(200).json({
					status: "SUCCESS",
					message: "Complaint Found",
					data,
				});
			})
			.catch((err) => {
				res.status(500).send({ message: err.message });
			});
	},
	getComplaintByUserIdAndStatus: async(req, res) => {
		const { id } = req.params;
		Complaint.find({ userId: id},{status:status})
			.then((data) => {
				res.status(200).json({
					status: "SUCCESS",
					message: "Complaint Found",
					data,
				});
			})
			.catch((err) => {
				res.status(500).send({ message: err.message });
			});
	},
	getComplaintByStatus: async(req, res) => {
		const { status } = req.params;
		Complaint.find({ status: status })
			.then((data) => {
				res.status(200).json({
					status: "SUCCESS",
					message: "Complaint Found",
					data,
				});
			})
			.catch((err) => {
				res.status(500).send({ message: err.message });
			});
	},
	getOneComplaint: async(req, res) => {
		try {
			Complaint.findById(req.params.id).then((data) =>
				res.json({
					status: "SUCCESS",
					message: "Complaint Found",
					data,
				})
			);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
	getComplaint: async(req, res, next) => {
		try {
			Complaint.find().then((data) =>
				res.json({
					status: "SUCCESS",
					message: "Complaints found",
					data,
				})
			);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
	addComplaint: async(req, res) => {
		const Comp = req.body;
		const newComplaint = new Complaint(Comp);
		try {
			newComplaint.save();
			res.status(201).json({
				status: "SUCCESS",
				message: "Complaint Sended",
				newComplaint,
			});
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
	
	
	updateComplaint: async(req, res) => {
		const newComplaint = new Complaint(req.body);
		try {
			Complaint.findByIdAndUpdate(req.params.id, newComplaint, {
				useFindAndModify: false,
			}).then((complaint) => {
				res.json(complaint);
			});
		} catch (error) {
			res.status(400).json({ message: error });
		}
	},

	updateComplaintStatus : async (req, res) => {
		try {
			const {status} = req.body;
			await Complaint.findOneAndUpdate(
				{ _id: req.params.id },
				{ status },
			);
			res.json({
				status: "SUCCESS",
				message:"updated successfully"
			})
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
	sendMsgComplaint : async (req, res) => {
		try {
			const {from,content} = req.body;
			await Complaint.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { msgs: { from, content } } },)
				res.json({
					status: "SUCCESS",
					message:"Msg sended successfully"
				})
			} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
	deleteComplaint: async(req, res) => {
		const id = req.params.id;
		Complaint.findByIdAndRemove(id)
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot delete Complaint with id=${id}.`,
					});
				} else {
					res.send({
						message: "Complaint was deleted successfully!",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete Complaint with id=" + id,
				});
			});
	},
};
