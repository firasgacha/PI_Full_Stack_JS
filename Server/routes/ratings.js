var express = require('express');
var router = express.Router();
var {Product,Categorie,Image}=require('../models/product');
var {User}=require("../models/user");
var {Rate}=require("../models/rate");
var ratingsController = require("../controllers/rateController");

router.post('/', async function (req, res)  {
    if (req.body.id_p) {
        Rate.findById(req.body.id_r,function (error, docrate) {
            if(error)
                throw error;
            res.render("", {docrate});
        });
    }
    else{
        res.render("");
    }
});

router.post('/add', async function (req, res) {
    var rate=new Rate({
        Stars:req.body.stars
    });
    const finduser = User.findById(req.body.id_u);
    const docuser = await finduser.exec();
    if(docuser)
        rate.User=docuser
    rate.save();
    const findproduct = Product.findById(req.body.id_p);
    const docproduct = await findproduct.exec();
    docproduct.Rate.push(rate);
    docproduct.save();
});

router.post('/update', async function (req, res) {
    const findrate = Rate.findByIdAndUpdate(req.body.id_r,
        {
            Stars:req.body.stars
        });
    const docrate = await findrate.exec();
    await docrate.save();
    Product.find((error, result) => {
        if(error)
            throw error;
        for (const k in result){
            for(const n in result[k]['Rate']){
                if(result[k]['Rate'][n]['_id']==req.body.id_r)
                    result[k]['Rate'][n]['Stars'] = req.body.stars;
            }
            result[k].save();
        }
    });
});

router.post('/delete', async function (req, res) {
    await Rate.findByIdAndDelete(req.body.id_r).exec();
    Product.find((error, result) => {
        if(error)
            throw error;
        for (const k in result){
            for(const n in result[k]['Rate']){
                if(result[k]['Rate'][n]['_id']==req.body.id_r)
                    result[k]['Rate'].splice(result[k]['Rate'][n],1);
            }
            result[k].save();
        }
    });
});

router.get('/get',ratingsController.getratings );
router.get('/getjson', ratingsController.getratingsjson);

module.exports = router;