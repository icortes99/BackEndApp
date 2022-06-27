const mockingoose = require('mockingoose')
const BookSchema = require('../models/book.model')
const {getAllBooks, getBooksByAuthID, addBook, updateBook, deleteBook} = require('./book.service')

const SAMPLE_BOOKS = [
    {
        "_id": "62aceef4098ab9ca149fc06c",
        "title": "Harry Potter y la serpiente",
        "authorID": 10,
        "publishedAt": "2022-06-01T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62acef26098ab9ca149fc06e",
        "title": "Unica mirando al mar",
        "authorID": 1,
        "publishedAt": "2010-06-22T06:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b0f0442b09f8c33a904d9f",
        "title": "Wall street",
        "authorID": 10,
        "publishedAt": "2022-06-01T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b0fc8edad971261cbd3518",
        "title": "elixir bible",
        "authorID": 9,
        "publishedAt": "2022-06-07T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b0fcbddad971261cbd352b",
        "title": "Buho book",
        "authorID": 6,
        "publishedAt": "2022-06-09T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b1441ec7ae3ed4078dea6f",
        "title": "Elden ring",
        "authorID": 1,
        "publishedAt": "2022-06-16T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b148219b7d96e6e553ecef",
        "title": "Loba",
        "authorID": 5,
        "publishedAt": "2022-06-08T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b28aa00e01051b21ce140c",
        "title": "Jamming sin fronteras",
        "authorID": 1655867648692,
        "publishedAt": "2022-06-02T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b28be60e01051b21ce1479",
        "title": "One love",
        "authorID": 1655867648692,
        "publishedAt": "2022-06-10T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b28c310e01051b21ce149b",
        "title": "Aves",
        "authorID": 6,
        "publishedAt": "2022-06-10T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b28d3d0e01051b21ce14bf",
        "title": "Redemption song",
        "authorID": 1655867648692,
        "publishedAt": "2022-06-09T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b28d7b0e01051b21ce14e1",
        "title": "war",
        "authorID": 1655867648692,
        "publishedAt": "2022-06-10T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62b29e200e01051b21ce1759",
        "title": "Animales nocturnos",
        "authorID": 6,
        "publishedAt": "2022-06-09T00:00:00.000Z",
        "__v": 0
    }
]

describe('Books unit testing', ()=>{
    //Get all
    test('get all books stored in db', async ()=>{
        mockingoose(BookSchema).toReturn( SAMPLE_BOOKS, 'find')

        const listBooks = await getAllBooks()

        expect(JSON.parse(JSON.stringify(listBooks))).toEqual(JSON.parse(JSON.stringify(SAMPLE_BOOKS)))
    })

    //Get books from author
    test('get all related books with an author', async ()=>{
        const hardCodedList= [{
            "_id": "62aceef4098ab9ca149fc06c",
            "title": "Harry Potter y la serpiente",
            "authorID": 10,
            "publishedAt": "2022-06-01T00:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "62b0f0442b09f8c33a904d9f",
            "title": "Wall street",
            "authorID": 10,
            "publishedAt": "2022-06-01T00:00:00.000Z",
            "__v": 0
        }]

        mockingoose(BookSchema).toReturn(hardCodedList, 'find')

        const t = await getBooksByAuthID(10)

        expect(JSON.parse(JSON.stringify(hardCodedList))).toEqual(JSON.parse(JSON.stringify(t)))
    })

    //Add new book
    test('add new author and return it', async ()=>{
        const tempBook = {
            "title": "Harry Potter y la serpiente",
            "authorID": 10,
            "publishedAt": new Date("2022-06-09T00:00:00.000Z"),
        }

        mockingoose(BookSchema).toReturn(tempBook, 'save')

        const w = await addBook(tempBook)

        expect(JSON.parse(JSON.stringify(tempBook.title))).toEqual(JSON.parse(JSON.stringify(w.title)))
    })

    //Update book
    test('modify an existing book', async ()=>{
        const tmpBook = {
            "_id": "62b0f0442b09f8c33a904d9f",
            "title": "Wall street journal",
            "authorID": 10,
            "publishedAt": "2022-06-01T00:00:00.000Z",
            "__v": 0
        }

        mockingoose(BookSchema).toReturn(tmpBook, 'findOneAndUpdate')

        const f = await updateBook(tmpBook._id, tmpBook)

        expect(JSON.parse(JSON.stringify(tmpBook.title))).toEqual(JSON.parse(JSON.stringify(f.title)))
    })

    //Delete book
    test('delete a book and return it', async ()=>{
        const tmpBook = {
            "_id": "62b0f0442b09f8c33a904d9f",
            "title": "Wall street journal",
            "authorID": 10,
            "publishedAt": "2022-06-01T00:00:00.000Z",
            "__v": 0
        }

        mockingoose(BookSchema).toReturn(tmpBook, 'findOneAndDelete')

        const s = await deleteBook(tmpBook._id)

        expect(JSON.parse(JSON.stringify(s.title))).toEqual(JSON.parse(JSON.stringify(s.title)))
    })
})