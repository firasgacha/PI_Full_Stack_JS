var express = require('express');
var router = express.Router();
var {Product,Categorie,Image}=require('../models/product');
var {Store}=require("../models/store.model");
var {User}=require("../models/user.model");
var {Rate}=require("../models/rate");
var {Feedback}=require("../models/feedback");
var prodcutsController=require("../controllers/productsController")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/');
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

router.post('/', async function (req, res)  {
    if (req.body.id_p) {
        Product.findById(req.body.id_p,function (error, docproduct) {
            if(error)
                throw error;
            res.render("Modifyproduct.twig", {docproduct});
        });
    }
    else{
        res.render("Addproduct.twig");
    }
});

router.post('/add',  upload.array('multi_files'), async function (req, res) {
    try {

        var cat=new Categorie(
            {
                name:req.body.categorie
            }
        );
        var store=new Store({
            fullName:Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        })
        var prod= new Product(
            {
                Price:req.body.price,
                Categorie:cat,
                Etat:req.body.etat,
                Store:store
            }

        );
        for(var file in req.files)
            prod.Images.push(new Image({ img:req.files[file]['filename']}));
        prod.save();
    res.json({msg: "Added!"})
}catch(err){
    return res.status(500).json({msg: err.message})
}
});

router.post('/update', upload.array('multi_files'), async function (req, res) {
   try {
    var cat=new Categorie(
        {
            name:req.body.categorie
        }
    );
    const findproduct = Product.findByIdAndUpdate(req.body.id_p,
        {
            Price:req.body.price,
            Categorie:cat,
            Etat:req.body.etat
        });
    const docproduct = await findproduct.exec();
    if(req.files.length) {
        docproduct.Images=[];
        for (var file in req.files)
            docproduct.Images.push(new Image({img: req.files[file]['filename']}));
    }
    await docproduct.save();
    res.json({msg: "Updated!"})
}catch(err){
    return res.status(500).json({msg: err.message})
}
});

router.post('/delete', async function (req, res) {
    try {
        await Product.findByIdAndDelete(req.body.id_p).exec();
        res.json({msg: "Deleted!"})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
});

router.get('/get',prodcutsController.getproducts );
router.get('/getjson', prodcutsController.getproductsjson);

module.exports = router;