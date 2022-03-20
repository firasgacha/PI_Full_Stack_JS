const mongoose = require('mongoose');

const Complaint = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Open' },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData' },
    msgs: [
        {
            from: { type: String },
            content: { type: String }
        },{ timestamps: true }
    ]
},{ timestamps: true }
)

// Complaint.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   })
module.exports = mongoose.model('Complaint', Complaint)
