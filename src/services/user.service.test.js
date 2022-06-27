const mockingoose = require('mockingoose')
const UserSchema = require('../models/user.model')
const {addUser, getUserByUserName} = require('./user.service')

describe('Users unit testing', ()=>{
    //Get user by username
    test('get an user through its id', async ()=>{
        const user = {
            "userName": "Wonka",
            "password": "wonkayak"
        }

        mockingoose(UserSchema).toReturn(user, 'find')

        const result = await getUserByUserName(user.userName, user.password)

        expect(result).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    })
})