const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/getAll', categoryController.getAll)
router.post('/create', checkRole('ADMIN'), categoryController.create)
router.post('/delete', checkRole('ADMIN'), categoryController.delete)

module.exports = router