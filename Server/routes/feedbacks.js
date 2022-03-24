var express = require('express');
var router = express.Router();
var {Product,Categorie,Image}=require('../models/product');
var {User}=require("../models/user");
var {Feedback}=require("../models/feedback");
var feedbacksController = require("../controllers/feedbackController");

router.post('/', async function (req, res)  {
    if (req.body.id_f) {
        Feedback.findById(req.body.id_f,function (error, docfeedback) {
            if(error)
                throw error;
            res.render("", {docfeedback});
        });
    }
    else{
        res.render("");
    }
});

router.post('/add', async function (req, res) {
    var feedback=new Feedback({
        Comment:req.body.comment
    });
    const finduser = User.findById(req.body.id_u);
    const docuser = await finduser.exec();
    if(docuser)
        feedback.User=docuser
    feedback.save();
    const findproduct = Product.findById(req.body.id_p);
    const docproduct = await findproduct.exec();
    docproduct.Feedback.push(feedback);
    docproduct.save();
});

router.post('/update', async function (req, res) {
    const findfeedback = Feedback.findByIdAndUpdate(req.body.id_f,
        {
            Comment:req.body.comment
        });
    const docfeedback = await findfeedback.exec();
    await docfeedback.save();
    Product.find((error, result) => {
        if(error)
            throw error;
        for (const k in result){
            for(const n in result[k]['Feedback']){
                if(result[k]['Feedback'][n]['_id']==req.body.id_f)
                    result[k]['Feedback'][n]['Comment'] = req.body.comment;
            }
            result[k].save();
        }
    });
});

router.post('/delete', async function (req, res) {
    await Feedback.findByIdAndDelete(req.body.id_f).exec();
    Product.find((error, result) => {
        if(error)
            throw error;
        for (const k in result){
            for(const n in result[k]['Feedback']){
                if(result[k]['Feedback'][n]['_id']==req.body.id_f)
                    result[k]['Feedback'].splice(result[k]['Feedback'][n],1);
            }
            result[k].save();
        }
    });
});

router.get('/get',feedbacksController.getfeedbacks );
router.get('/getjson', feedbacksController.getfeedbacksjson);

module.exports = router;