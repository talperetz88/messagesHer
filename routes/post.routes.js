const express = require('express')
const router = express.Router()
const post = require('../models/post.model')
const m = require('../helpers/middlewares')
// Routes
module.exports = router

/* All messages */
router.get('/', m.mustBeString , async (req, res) => {
    const sender = req.body.sender 
    const messageType = req.body.messageType
    switch (messageType) {
        case 'AllMessages':
            await post.getMessages(sender)
            .then(posts => res.json(posts))
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message })
                } else {
                    res.status(500).json({ message: err.message })
                }
            })
            break;
        case 'allUnread':
            await post.getAllUnreadMessages(sender)
            .then(posts => res.json(posts))
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message })
                } else {
                    res.status(500).json({ message: err.message })
                }
            })
            break;
        case 'read':
            await post.readMessages(sender)
            .then(posts => res.json(posts))
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message })
                } else {
                    res.status(500).json({ message: err.message })
                }
            })
            break;
        default:
            res.json({ message: 'Wrong message type' })
            break;
    }


   
})


/* Insert a new message */
router.post('/', m.checkFieldsPost, async (req, res) => {
    await post.insertMessage(req.body)
    .then(post => res.status(201).json({
        message: `The message #${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})


/* Delete a post */
router.delete('/', m.mustBeInteger, async (req, res) => {
    const id = req.body.id
    
    await post.deleteMessage(id)
    .then(post => res.json({
        message: `The message #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})