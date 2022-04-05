var mongoose=require('mongoose');
const {Schema} = require("mongoose");

var feedback=new Schema({
    Comment:String,
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})
var fee=mongoose.model('feedback',feedback);

module.exports = {
    Feedback : fee,
    Feedbackschema:feedback
}