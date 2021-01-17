function mustBeInteger(req, res, next) {
    const id = req.body.id    
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const { sender, receiver, subject ,message} = req.body   
    if (sender && receiver && subject && message) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

function mustBeString(req, res, next) {
    const sender = req.body.sender    
    if (typeof sender !== 'string') {
        res.status(400).json({ message: 'Sender must be an string' })
    } else {
        next()
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost,
    mustBeString
}