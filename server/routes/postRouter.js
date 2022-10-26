const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/getAll', postController.getAll)
router.post('/create', checkRole('ADMIN'), postController.create)
router.post('/delete', checkRole('ADMIN'), postController.delete)

module.exports = router