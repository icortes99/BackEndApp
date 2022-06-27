const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: {type: String, minlength: 3, required: true},
    birthDate: {type: Date, required: true},
    id: {type: Number, required: true}
})

const Author = mongoose.model('Author', AuthorSchema)
module.exports = Author