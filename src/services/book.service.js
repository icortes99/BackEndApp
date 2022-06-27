const BookSchema = require('../models/book.model')

class BooksService{
    static async getAllBooks(){
        const books = await BookSchema.find()
        return books
    }

    static async getBookById(id){
        const book = await BookSchema.findById(id)
        return book
    }

    //This one should filter by idA (an attribute from JSON)
    static async getBooksByAuthID(idAuthor){
        const books = await BookSchema.find({authorID: idAuthor})
        return books
    }

    static async addBook(bookData){
        const newBook = new BookSchema(bookData)
        await newBook.save()
        return newBook
    }

    static async updateBook(id, data){
        const updatedBook = await BookSchema.findByIdAndUpdate(id, data, {
            returnDocument: 'after',
            runValidators: true
        })
        return updatedBook
    }

    static async deleteBook(id){
        const book = await BookSchema.findByIdAndDelete(id)
        return book
    }
}

module.exports = BooksService