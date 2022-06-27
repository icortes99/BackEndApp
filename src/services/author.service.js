const AuthorSchema = require('../models/author.model')

class AuthorService{
    static async getAllAuthors(){
        const authors = await AuthorSchema.find()
        return authors
    }

    static async getAuthorID(id){
        const author = await AuthorSchema.findById(id)
        return author
    }

    static async addAuthor(authorData){
        const author = new AuthorSchema(authorData)
        await author.save()
        return author
    }

    static async updateAuthor(id, data){
        const updatedAuthor = await AuthorSchema.findByIdAndUpdate(id, data, {
            returnDocument: 'after',
            runValidators: true
        })
        return updatedAuthor
    }

    static async deleteAuthor(id){
        const author = await AuthorSchema.findByIdAndDelete(id)
        return author
    }
}

module.exports = AuthorService