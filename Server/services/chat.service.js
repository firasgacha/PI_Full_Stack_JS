const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
const users = [];

module.exports = {
	// Join user to chat
	userJoin(id, userId, room) {
		const user = { socketId, userId, room };

		users.push(user);

		return user;
	},

	// Get current user
	getCurrentUser(id) {
		return users.find((user) => user.id === id);
	},

	// User leaves chat
	userLeave(id) {
		const index = users.findIndex((user) => user.id === id);

		if (index !== -1) {
			return users.splice(index, 1)[0];
		}
	},

	// save message to db
	saveMessage(user, message) {
		const msg = {
			content: message.content,
			image: message.image,
			sender: user.userId,
			timestamp: Date.now(),
		};
		const chat = Chat.find({ id: user.room });
		chat.messages.push(msg);
		chat.save();
	},
};
