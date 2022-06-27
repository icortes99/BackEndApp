const express = require('express')
const mongoose = require('mongoose')
const authorsRouter = require('./routes/authors.routes.js')
const booksRouter = require('./routes/books.routes.js')
const userLogin = require('./routes/userLogIn.routes.js')
const userSignUp = require('./routes/userSingUp.routes.js')
const logger = require('./middleware/logger.middleware')
const error = require('./middleware/error.middleware')
const app = express()
const cors = require("cors")
app.use(cors())

const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'library'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger)

mongoose
.connect(`${DB_HOST}/${DB_NAME}`)
.then(()=>{
    console.log(`Connection to ${DB_HOST}/${DB_NAME} opened`)
})
.catch((err)=>{
    console.log('Error connecting to mongo: ', err)
})

//GET requests when match the root path
app.get('/', (req, res) => {
    res.send('Default page')
})

app.use('/authors', authorsRouter)
app.use('/books', booksRouter)
app.use('/login', userLogin)
app.use('/signup', userSignUp)
app.use(error)
module.exports = app