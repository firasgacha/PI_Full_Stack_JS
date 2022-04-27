const mongoose = require("mongoose");

const contact = new mongoose.Schema(
    {
        description: { type: String, required: false },
        userId: { type: String, required: false },
        name: { type: String, required: true },
        email : { type: String, required: true },
        phone : { type: String, required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model(contact);

