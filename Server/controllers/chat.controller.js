const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const Store = require("../models/store.model");

module.exports = {
	getChatsByUserId: async (req, res) => {
		const { idUser } = req.params;
		Chat.find({
			$or: [{ user_1: idUser }, { user_2: idUser }],
		})
			.select("-messages")
			.then(async (data) => {
				console.log(data);
				const chats = await Promise.all(
					data.map(
						async (chat) =>
							new Promise(async (resolve, reject) => {
								const { user_1, user_2 } = chat;
								const otherId = user_1 === idUser ? user_2 : user_1;
								const { name } = await User.findById(otherId).select(
									"name -_id"
								);
								resolve({
									...chat._doc,
									other: name,
								});
							})
					)
				);
				res.status(200).json({
					status: "SUCCESS",
					chats,
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
		const { idUser, owner } = req.body;
		if (idUser === owner) {
			return res.status(400).json({
				status: "ERROR",
				message: "You can't chat with yourself",
			});
		}
		const chat = await Chat.findOne({
			$or: [
				{ user_1: idUser, user_2: owner },
				{ user_1: owner, user_2: idUser },
			],
		});
		if (chat) {
			return res.status(400).json({
				status: "ERROR",
				message: "Chat already exists",
			});
		}
		const newChat = new Chat({
			user_1: idUser,
			user_2: owner,
			messages: [],
		});
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
	createChatFromStore: async (req, res) => {
		const { idUser, idStore } = req.body;
		const { owner } = await Store.findById(idStore);
		if (idUser === owner) {
			return res.status(400).json({
				status: "ERROR",
				message: "You can't chat with yourself",
			});
		}
		const chat = await Chat.findOne({
			$or: [
				{ user_1: idUser, user_2: owner },
				{ user_1: owner, user_2: idUser },
			],
		});
		if (chat) {
			return res.status(400).json({
				status: "ERROR",
				message: "Chat already exists",
			});
		}
		const newChat = new Chat({
			user_1: idUser,
			user_2: owner,
			messages: [],
		});
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
