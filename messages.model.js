const filename = '../data/messages.json'
let message = require(filename)
const aut = require('../aut.js')

function getMessages() {
    return new Promise((resolve, reject) => {
        if (message.length === 0) {
            reject({
                message: 'no message available',
                status: 202
            })
        }        resolve(message)
    })
}

function getMessage(id) {
    return new Promise((resolve, reject) => {
        aut.mustBeInArray(message, id)
        .then(message => resolve(message))
        .catch(err => reject(err))
    })
}

function insertMessage(newMessage) {
    return new Promise((resolve, reject) => {
        const id = { id: aut.getNewId(message) }
        const date = { 
            createdAt: aut.newDate(),
            updatedAt: aut.newDate()
        } 
        newMessage = { ...id, ...date, ...newMessage }
        message.push(newMessage)
        aut.writeJSONFile(filename, message)
        resolve(newMessage)
    })
}

function updateMessage(id, newMessage) {
    return new Promise((resolve, reject) => {
        aut.mustBeInArray(message, id)
        .then(Message => {
            const index = message.findIndex(p => p.id == Message.id)
            id = { id: Message.id }
            const date = {
                createdAt: Message.createdAt,
                updatedAt: aut.newDate()
            } 
            message[index] = { ...id, ...date, ...newMessage }
            aut.writeJSONFile(filename, message)
            resolve(message[index])
        })
        .catch(err => reject(err))
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        aut.mustBeInArray(message, id)
        .then(() => {
            message = message.filter(p => p.id !== id)
            aut.writeJSONFile(filename, message)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertMessage,
    getmessage,
    getMessage, 
    updateMessage,
    deleteMessage
}