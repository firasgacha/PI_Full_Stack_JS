const mongoose = require("mongoose");

const Chat = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true,
		},
		messages: [
			{
				content: { type: String, required: true },
				image: String,
				sender: {
					type: String,
					enum: ["user", "store"],
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
