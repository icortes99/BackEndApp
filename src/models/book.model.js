const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {type: String, minlength: 3, required: true},
    authorID: {type: Number, minlength: 1, required: true},
    publishedAt: {type: Date, required: true}
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book