const mongoose = require("mongoose");
const Chat = require("../models/chat.model");

module.exports = {
	getChatsByUserId: async (req, res) => {
		const { idUser } = req.params;
		Chat.find({
			$or: [{ user_1: idUser }, { user_2: idUser }],
		})
			.then((data) => {
				res.status(200).json({
					status: "SUCCESS",
					data,
				});
			})
			.catch((err) => {
				res.status(500).send({ message: err.message });
			});
	},
	getChatByID: async (req, res) => {
		try {
			Chat.findById(req.params.id).then((data) =>
				res.json({
					status: "SUCCESS",
					data,
				})
			);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},
	createChat: async (req, res) => {
		const newChat = new Chat(req.body);
		try {
			newChat.save();
			res.status(201).json({
				status: "SUCCESS",
				newChat,
			});
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
};
