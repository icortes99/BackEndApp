const express = require('express')
const AuthorService = require('../services/author.service')
const authorsRouter = express.Router()
const info = require('../../seeds/authors.json')
const authorization = require('../middleware/authorization.midleware')
const {
    formatRequestError,
    isValidationError,
} = require('../helpers/errors.helper')

const getAuthors = ()=>{
    let values = []
    info.forEach((x) => {
        values.push(x.name);
    });
    return values;
}

const getIdAuthor = (ide)=>{
    let value = 'default value';
    info.forEach((x) => {
        if(x.id === parseInt(ide)){
            value = x.name;
        }
    })
    return value;
}

authorsRouter
.route('/')
.get(async (req, res)=>{
    const list = await AuthorService.getAllAuthors()
    res.json(list)
})
.post(async (req, res)=>{
    const inInfo = req.body;

    try {
        const newAuthor = await AuthorService.addAuthor(inInfo)
        res.send(newAuthor)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

authorsRouter
.route('/:id')
.get(async (req, res)=>{
    const authId = req.params.id
    const obj = await AuthorService.getAuthorID(authId)
    obj ? res.json(obj) : res.sendStatus(404)
})
.put(async (req, res) => {
    const authorID = req.params.id
    const authorData = req.body

    try {
        const updatedAuthor = await AuthorService.updateAuthor(authorID, authorData)
        updatedAuthor ? res.json(updatedAuthor) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})
.delete(async (req, res) => {
    const authorID = req.params.id
    const deletedAuthor = await AuthorService.deleteAuthor(authorID)
    deletedAuthor ? res.json(deletedAuthor) : res.sendStatus(404)
})

module.exports = authorsRouter