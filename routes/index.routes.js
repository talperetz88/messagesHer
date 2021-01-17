const express = require('express')
const router = express.Router()
module.exports = router

// router.use('/api/v1/posts', require('./post.routes'))
router.use('/api/v1/getallmessages', require('./post.routes'))
router.use('/api/v1/enterNewMessage', require('./post.routes'))
router.use('/api/v1/deletemessages', require('./post.routes'))