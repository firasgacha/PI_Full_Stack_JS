const mongoose = require("mongoose");
const { modelName } = require("../models/complaint.model");
const Contact = require("../models/contact.model");

modelName.exports = {
    getContacts: async(req, res, next) => {
		try {
			Contact.find().then((data) =>
				res.json({
					status: "SUCCESS",
					message: "Contacts found",
					data,
				})
			);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
    addContact: async(req, res) => {
		const Comp = req.body;
		const newContact = new Contact(Comp);
		try {
			newContact.save();
			res.status(201).json({
				status: "SUCCESS",
				message: "Contact Sended",
				newContact,
			});
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
}