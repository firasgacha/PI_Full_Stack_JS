var mongoose = require("mongoose");

const store = new mongoose.Schema(
	{
		fullName: { type: String, required: true, unique: true, dropDups: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		profileImage: { type: String, default: "defaultStorePic.png" },
		coverImage: { type: String, default: "defaultCoverPic.png" },
		description: { type: String, default: "No description" },
		address: { type: String, default: "No address" },
		phone: { type: String, default: "No phone" },
		email: { type: String, default: "No email" },
		localisation: { type: String, default: "37.280236, 9.873783" },
		contact: {
			website: { type: String, default: "No website" },
			facebook: { type: String, default: "No facebook" },
			instagram: { type: String, default: "No instagram" },
			twitter: { type: String, default: "No twitter" },
		},
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		stats: {
			productSales: { type: Number, default: 0 },
			productViews: { type: Number, default: 0 },
		},
	},
	{ timestamps: true }
);

var str = mongoose.model("store", store);
module.exports = {
	Store: str,
	Storeschema: store,
};
