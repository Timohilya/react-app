const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const categoryRouter = require('./categoryRouter')

 
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/category', categoryRouter)

module.exports = router