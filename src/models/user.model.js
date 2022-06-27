const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
    fullName: {type: String, minlength: 3, required: true},
    userName: {type: String, minlength: 3, required: true, unique: true},
    password: {type: String, minlength: 3, required: true}
})

const User = mongoose.model('User', userSchema)
module.exports = User