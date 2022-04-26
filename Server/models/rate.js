var mongoose=require('mongoose');
const {Schema} = require("mongoose");

var rate=new Schema({
    Stars:Number,
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{ timestamps: true })
var rat=mongoose.model('rating',rate);

module.exports = {
    Rate : rat,
    Rateschema:rate
}