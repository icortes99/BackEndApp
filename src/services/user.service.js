const UserSchema = require('../models/user.model')

class UserService{
    static async getUserByUserName(userN, userPassw){
        const user = await UserSchema.find({userName: userN, password: userPassw})
        console.log('user: ' + user)
        if (user[0]){
            return user
        } else {return null}
    }

    static async addUser(userData){
        const newUser = new UserSchema(userData)
        await newUser.save()
        return newUser
    }
}

module.exports = UserService