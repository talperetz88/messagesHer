const fs = require('fs')

const getNewId = (array) => {
    console.log(array.length);
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID is not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function findMsgBySender(array, sender) {
    return new Promise((resolve, reject) => {
        const row = array.filter((r) =>  r.sender === sender || r.receiver === sender)
        if (!row) {
            reject({
                message: 'Sender is not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function findUnreadMsgBySender(array, sender) {
    return new Promise((resolve, reject) => {
        const row = array.filter((r) =>  r.sender === sender && r.read == "false")
        if (!row) {
            reject({
                message: 'All the messages are read',
                status: 200
            })
        }
        resolve(row)
    })
}

function findFirstUnreadMsgBySender(array, sender) {
    return new Promise((resolve, reject) => {
        const row = array.find((r) =>  r.sender === sender && r.read == "false")
        if (!row) {
            reject({
                message: 'All the messages are read',
                status: 200
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync('data/post.json', JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    findMsgBySender,
    findUnreadMsgBySender,
    findFirstUnreadMsgBySender
}