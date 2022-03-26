const mongoose = require('mongoose');
const UserData = require('../models/user.model');

module.exports = {

    getOneUser: (req, res) => {
        try {
            if( !mongoose.Types.ObjectId.isValid(id) ) return false;
            UserData.findById(req.params.id).then((data) => res.json(
                {
                    status: "SUCCESS",
                    message: "User Found",
                    data
                }
            ));
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    },
}