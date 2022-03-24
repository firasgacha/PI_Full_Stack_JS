var mongoose=require('mongoose');
const {Schema} = require("mongoose");

var store=new Schema({
    Fullname:String,
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})
var str=mongoose.model('store',store)
module.exports={
    Store:str,
    Storeschema:store
};