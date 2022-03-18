const mongoose = require('mongoose');

const Complaint = new mongoose.Schema({
    type: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    description: { type: String },
    status: { type: String, default: 'Open' },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData' },
    msgs: [
        {
            from: { type: String },
            date: { type: Date, default: Date.now() },
            content: { type: String }
        }
    ]
})

module.exports = mongoose.model('Complaint', Complaint)
