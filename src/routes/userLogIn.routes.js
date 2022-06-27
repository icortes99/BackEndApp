const express = require('express')
const { isValidationError, formatRequestError } = require('../helpers/errors.helper')
const UserService = require('../services/user.service')
const usersRouter = express.Router()
const jwt = require('jsonwebtoken')
const secretValue = 'secret'

usersRouter
.route('/')
.post(async (req, res)=>{
    const userObj = req.body

    try {
        const obj = await UserService.getUserByUserName(userObj.userName, userObj.password)
        const user = {object: obj}
        const accessToken = jwt.sign(user, secretValue)
        obj != null ? res.json({accessToken: accessToken}) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

module.exports = usersRouter