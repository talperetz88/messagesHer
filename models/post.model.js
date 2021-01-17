const filename = '../data/post.json'
let message = require(filename)
const helper = require('../helpers/helper.js')

/* get all messages foe a specific user */
function getMessages(sender) {
    return new Promise((resolve, reject) => {
        helper.findMsgBySender(message, sender)
        .then(message => {
            resolve(message)
        })
        .catch(err => reject(err))
    })
}

function getAllUnreadMessages(sender) {
    return new Promise((resolve, reject) => {
        helper.findUnreadMsgBySender(message, sender)
        .then(message => resolve(message))
        .catch(err => reject(err))
    })
}

function readMessages(sender) {
    return new Promise((resolve, reject) => {
        helper.findFirstUnreadMsgBySender(message, sender)
        .then(message => {
            updateMessage(message.id)
             .then( message => resolve(message))
             .catch(err => reject(err))
            /* resolve(message) */})
        .catch(err => reject(err))
    })
}

function insertMessage(newMessage) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(message) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate(),
            read: 'false'
        } 
        newMessage = { ...id, ...date, ...newMessage }
        message.push(newMessage)
        helper.writeJSONFile(filename, message)
        resolve(newMessage)
    })
}

function updateMessage(id) {
    return new Promise((resolve, reject) => {
            const index = message.findIndex(p => p.id == id)
            id = { id: message[index].id }
            const date = {
                createdAt: message.createdAt,
                updatedAt: helper.newDate(),
                read: "true",
                sender: message[index].sender,
                receiver: message[index].receiver,
                subject: message[index].subject,
                message: message[index].message,
            } 
            message[index] = { ...id, ...date}
            helper.writeJSONFile(filename, message)
            resolve(message[index])
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(message, id)
        .then(() => {
            message = message.filter(p => p.id != id)
            helper.writeJSONFile(filename, message)
            resolve({
                message: 'Message deleted',
                status: 200
            })
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertMessage,
    getMessages, 
    updateMessage,
    deleteMessage,
    getAllUnreadMessages,
    readMessages
}