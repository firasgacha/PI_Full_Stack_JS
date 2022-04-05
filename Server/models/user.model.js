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
        required: [true, "Please enter your address!"],
    },
    city: {
        type: String,
        required: [true, "Please enter your city!"],
    },
    state: {
        type: String,
        required: [true, "Please enter your state!"],
    },
    zip: {
        type: String,
        required: [true, "Please enter your Zip/Postal code!"],
    },
    country: {
        type: String,
        required: [true, "Please enter your country!"],
    },
    telephone: {
        type: String,
        required: [true, "Please enter your address!"],
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