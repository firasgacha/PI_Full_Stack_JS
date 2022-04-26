const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    country: {
        type: String,
    },
    telephone: {
        type: String,
    }
    ,
    role: {
        type: Number,
        default: 0 // 0 = user , 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },

},{collection: 'user'})

const model = mongoose.model('Users', userSchema)

module.exports = model