const router = require('express').Router()
const ctrls = require('../controllers/insertData')
// const uploader = require('../config/cloudinary.config')

router.post('/', ctrls.insertProduct)
router.post('/cate', ctrls.insertCategory)


module.exports = router