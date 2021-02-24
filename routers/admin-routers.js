const router = require('express').Router()
const {body} = require('express-validator')
const {adminController} = require('../controller')

router.get('/get/sales/', adminController.representaiives)
router.get('/get/report', adminController.credit)

module.exports = router