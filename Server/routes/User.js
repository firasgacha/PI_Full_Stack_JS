const express = require ('express');
const router = express.Router();

const {
    getOneUser
}= require ('../controllers/User.js')

router.get('/getOneUser/:id',getOneUser);

module.exports = router;