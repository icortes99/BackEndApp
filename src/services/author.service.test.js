const mockingoose = require('mockingoose')
const AuthorSchema = require('../models/author.model')
const { getAllAuthors, getAuthorID, addAuthor, updateAuthor, deleteAuthor } = require('./author.service')

const SAMPLE_AUTHORS = [
    {
        "_id": "62ae8d482f1c5b59625ff654",
        "name": "Kangaru",
        "birthDate": "2022-06-09T00:00:00.000Z",
        "id": 1,
        "__v": 0
    },
    {
        "_id": "62ae8e0d2f1c5b59625ff668",
        "name": "Buho",
        "birthDate": "2022-06-29T00:00:00.000Z",
        "id": 6,
        "__v": 0
    },
    {
        "_id": "62af6541be63db5a159de083",
        "name": "Che Guevara",
        "birthDate": "2022-06-23T00:00:00.000Z",
        "id": 9,
        "__v": 0
    },
    {
        "_id": "62b0aeb794fcd389e026d357",
        "name": "Don Omar",
        "birthDate": "2022-06-02T00:00:00.000Z",
        "id": 10,
        "__v": 0
    }
]

describe('Authors unit testing', ()=>{
    //Get all
    test('all authors stored in DB', async ()=>{
        mockingoose(AuthorSchema).toReturn(SAMPLE_AUTHORS, 'find')
        
        const list = await getAllAuthors()

        expect(JSON.parse(JSON.stringify(list))).toEqual(JSON.parse(JSON.stringify(SAMPLE_AUTHORS)))
    })

    //Get one by ID
    test('should return the author object with the id', async ()=>{
        const example = {
            "_id": "62af6541be63db5a159de083",
            "name": "Che Guevara",
            "birthDate": new Date('2022-06-23T00:00:00.000Z'),
            "id": 9,
            "__v": 0
        }

        mockingoose(AuthorSchema).toReturn(example, 'findOne')

        const doc = await getAuthorID(example._id)

        expect(JSON.parse(JSON.stringify(doc))).toEqual(JSON.parse(JSON.stringify(example)))
    })

    //Add author
    test('add a new author and return the new object', async ()=>{
        const tempAuthor = {
            "name": "Pepe",
            "birthDate": new Date("2022-06-09T00:00:00.000Z"),
            "id": 1
        }

        mockingoose(AuthorSchema).toReturn(tempAuthor, 'save')

        const x = await addAuthor(tempAuthor)

        expect(JSON.parse(JSON.stringify(tempAuthor.name))).toEqual(JSON.parse(JSON.stringify(x.name)))
    })

    //Update author
    test('modify an existing author', async ()=>{
        const tempAuthor = {
            "_id": "62af6541be63db5a159de083",
            "name": "Pepe",
            "birthDate": new Date("2022-06-09T00:00:00.000Z"),
            "id": 9
        }

        mockingoose(AuthorSchema).toReturn(tempAuthor, 'findOneAndUpdate')

        const y = await updateAuthor(tempAuthor._id, tempAuthor)

        expect(JSON.parse(JSON.stringify(tempAuthor.name))).toEqual(JSON.parse(JSON.stringify(y.name)))
    })

    //Delete author
    test('delete an author and return it', async ()=>{
        const tempAuth = {
            "_id": "62af6541be63db5a159de083",
            "name": "Pepe",
            "birthDate": new Date("2022-06-09T00:00:00.000Z"),
            "id": 9
        }

        mockingoose(AuthorSchema).toReturn(tempAuth, 'findOneAndDelete')

        const z = await deleteAuthor(tempAuth._id)

        expect(JSON.parse(JSON.stringify(tempAuth.name))).toEqual(JSON.parse(JSON.stringify(z.name)))
    })
})