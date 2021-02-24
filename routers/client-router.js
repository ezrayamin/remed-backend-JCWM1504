const router = require('express').Router()
const {body} = require('express-validator')
const {clientController} = require('../controller')

router.get('/get/client/:id_sales', clientController.get)
router.post('/add/client', clientController.add)
router.patch('/edit/client/:id', clientController.edit)
router.delete('/delete/client/:id', clientController.delete)

module.exports = router