const mongoose = require('mongoose');
const Complaint = require('../models/complaint.model');

module.exports = {
    getComplaintByUserId: (req, res) => {
        const {id} = req.params;
        Complaint.find({userId: id}).then(data => {
            res.status(200).json(
                {
                    status: "SUCCESS",
                    message: "Complaint Found",
                    data
                }
            );
        }
        ).catch(err => {
            res.status(500).send({message: err.message});
        }
        );
    },
    getOneComplaint: (req, res) => {
        try {
            Complaint.findById(req.params.id).then((data) => res.json(
                {
                    status: "SUCCESS",
                    message: "Complaint Found",
                    data
                }
            ));
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    },
    getComplaint: (req, res, next) => {
        try {
            Complaint.find().then((data) => res.json(
                {
                    status: "SUCCESS",
                    message: "Complaints found",
                    data
                }
            ));
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    addComplaint: (req, res) => {
        const  Comp = req.body;
        const newComplaint = new Complaint(Comp);
        try {
            newComplaint.save();
            res.status(201).json({
                status: "SUCCESS",
                message: "Complaint Sended", newComplaint
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // addComplaint: async (req, res) => {
    //     const  {type, description, imgName ,email, userId} = req.body;
    //     const newComplaint = await new Complaint({type, description, imgName ,email, userId});
    //     try {
    //         await newComplaint.save();
    //         res.status(201).json({
    //             status: "SUCCESS",
    //             message: "Complaint Sended", newComplaint
    //         });
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },
    

    // const createProduct = async(req, res) => {
    //     console.log(`create prod in server ${req}`);
        
    //     const { productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color } = req.body;
    //     const newProduct = await new Product({productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color});
    //     try {
    //         await newProduct.save();
    //         res.status(201).json(newProduct);
    //     } catch (error) {
    //         res.status(409).send({message: error.message});
            
    //     }
    // }
    updateComplaint: (req, res) => {
        const newComplaint = new Complaint(req.body);
        try {
            Complaint.findByIdAndUpdate(req.params.id, newComplaint, {
                useFindAndModify: false,
            }).then((complaint) => { res.json(complaint) });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    },
    deleteComplaint: (req, res) => {
        const id = req.params.id;
        Complaint.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete Complaint with id=${id}.`
                    });
                } else {
                    res.send({
                        message: "Complaint was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Complaint with id=" + id
                });
            });
    }
}