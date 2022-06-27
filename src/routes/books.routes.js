const express = require('express')
const BooksService = require('../services/book.service')
const booksRouter = express.Router()
const info = require('../../seeds/books.json')
const authorization = require('../middleware/authorization.midleware')
const { isValidationError, formatRequestError } = require('../helpers/errors.helper')
let parseInfo = info

const getBooks = ()=> {
    let values = [];
    parseInfo.forEach((x) => {
        values.push(x)
    })
    return values;
}

const getBooksId = (id)=>{
    let values = []
    parseInfo.forEach((x) => {
        if(x.idA === parseInt(id)){
            values.push(x)
        }
    })
    return values
}

booksRouter
.route('/')
.get(async (req, res)=>{
    const list = await BooksService.getAllBooks()
    res.send(list)
})
.post(async (req, res)=>{
    const inInfo = req.body
    /*let obj = {
        name: inInfo.name,
        year: parseInt(inInfo.year),
        idA: parseInt(inInfo.idA)
    }
    parseInfo.push(obj)
    console.log(parseInfo)
    res.json({
        name: inInfo.name,
        year: inInfo.year,
        idA: inInfo.idA
    })*/

    try {
        const newBook = await BooksService.addBook(inInfo)
        res.send(newBook)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})


booksRouter
.route('/:id')
.get(async (req, res) => { //this get is to find the book with that id
    const authID = req.params.id
    const obj = await BooksService.getBooksByAuthID(authID)
    obj ? res.json(obj) : res.sendStatus(404)
})
.put(async (req, res)=>{
    const bookID = req.params.id
    const bookData = req.body
    //let selected = getBooksId(bookID)
    //selected es un array de objetos
    
    try {
        const updatedBook = await BooksService.updateBook(bookID, bookData)
        updatedBook ? res.json(updatedBook) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})
.delete(async (req, res) => {
    const bookID = parseInt(req.params.id)
    let deletedBook
    try {
        deletedBook = await BooksService.deleteBook(bookID)
    } catch (err) {
        console.log('Error when deleting: ' + err)
    }
    deletedBook ? res.json(deletedBook) : res.sendStatus(404)
})

booksRouter
.route('/:query') //url does not detect parameter as a valid character
.get(async (req, res) =>{
    const authorID = req.params.query
    const list = await BooksService.getBooksByAuthID(authorID)
    list ? res.json(list) : res.sendStatus(404)
})

module.exports = booksRouter