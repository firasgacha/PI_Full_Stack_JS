const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {type: String},
    email: {type: String,unique: true},
    password: {type: String},
    address: {type: String},
    image:{type: String},
    quote : {type: String},
},{collection: 'user'})

const model = mongoose.model('UserData', User)

module.exports = {
    User : model,
    Userschema:User
}