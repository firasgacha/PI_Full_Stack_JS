const mongoose = require('mongoose');
const Complaint = require('../models/complaint.model');

module.exports = {

    getOneComplaint: (req, res) => {
        try {
            Complaint.findById(req.params.id).then((complaint) => res.json(complaint));
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    },
    getComplaint: (req, res, next) => {
        try {
            Complaint.find().then((comp) => res.json(comp));
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    addComplaint: (req, res) => {
        const complaint = req.body;
        const newComplaint = new Complaint(complaint);
        try {
            newComplaint.save();
            res.status(201).json(newComplaint);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
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