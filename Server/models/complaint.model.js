const mongoose = require('mongoose');

const Complaint = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required:false },
    status: { type: String, default: 'Open' },
    image: { type: String, required:false },
    email: { type: String, required:false },
    userId: { type: String, required:false },
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
