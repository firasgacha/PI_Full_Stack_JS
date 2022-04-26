const mongoose = require("mongoose");

const Chat = mongoose.Schema(
	{
		user_1: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		user_2: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		messages: [
			{
				content: { type: String, required: true },
				image: String,
				sender: {
					type: String,
					enum: ["user", "storeOwner"],
					default: "user",
				},
				timestamp: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Chat", Chat);
