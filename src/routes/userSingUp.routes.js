const express = require('express')
const { isValidationError, formatRequestError } = require('../helpers/errors.helper')
const UserService = require('../services/user.service')
const usersRouter = express.Router()

usersRouter
.route('/')
.post(async (req, res)=>{
    const inInfo = req.body

    try {
        const newUser = await UserService.addUser(inInfo)
        res.send(newUser)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

module.exports = usersRouter