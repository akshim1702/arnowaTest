const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})




const Message = mongoose.model('MESSAGE', messageSchema)

module.exports = Message;