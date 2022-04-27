const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
const users = [];

module.exports = {
	// Join user to chat
	userJoin(socketId, userId, room) {
		if (users.indexOf(userId) === -1) {
			const user = { socketId, userId, room };
			users.push(user);
			return user;
		}
		return;
	},

	// Get current user
	getCurrentUser(id) {
		return users.find((user) => user.socketId === id);
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
		Chat.findOne({ id: user.room }).then((chat) => {
			chat.messages.push(message);
			chat.save();
		});
	},
};
