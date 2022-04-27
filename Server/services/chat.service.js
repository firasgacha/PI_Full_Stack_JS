const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
let users = [];

module.exports = {
	// Join user to chat
	userJoin(socketId, userId, room) {
		if (users.indexOf((el) => userId == el.userId) === -1) {
			console.log("User joined");
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
	saveMessage(user, idRoom, message) {
		console.log(users);
		Chat.findOne({ id: idRoom }).then((chat) => {
			chat.messages.push(message);
			chat.save();
		});
	},
};
