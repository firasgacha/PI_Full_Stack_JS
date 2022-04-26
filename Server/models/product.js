var mongoose=require('mongoose');
const {Schema, models} = require("mongoose");
var {Store,Storeschema}=require("./store.model");
const {Rateschema} = require("./rate");
const {Feedbackschema} = require("./feedback");

var image = new mongoose.Schema({
    img: String
},{ _id: false });

var im=mongoose.model('image',image);

var categorie = new mongoose.Schema({
    name: String
},{ _id: false });

var cat=mongoose.model('categories',categorie);

var product=new Schema({
    Price:Number,
    Categorie: {
        type: categorie,
        default: () => ({})
    },
    Etat:String,
    Description:String,
    Images:[{
        type: image,
        default: () => ({})
    }],
    Store: {
        type: Storeschema,
        default: () => ({})
    },
    Rate:[{
        type : Rateschema,
        default: () => ({})
    }],
    Feedback:[{
        type : Feedbackschema,
        default: () => ({})
    }]
},{ timestamps: true })

var prod=mongoose.model('products',product);

module.exports={
    Categorie: cat,
    Product : prod,
    Image: im,
    Productschema:product
}