const router = require('express').Router()
const uploadImage = require('../middleware/UploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../middleware/auth')
router.post('/upload_avatar', uploadImage, auth,uploadCtrl.uploadAvatar)

module.exports = router