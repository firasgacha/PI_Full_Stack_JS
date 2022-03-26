const Users = require('../models/user.model');

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        console.log(user.role)

        if (user.role !== 1)
            return res.status(500).json({msg: "Admin resources access denied. "})
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin
