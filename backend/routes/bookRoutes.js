import express from 'express';
import {
    Book
} from '../models/bookModels.js';

const router = express.Router();


//Route for save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // Handle the error when some fields are missing
            return response.status(400).send({
                message: 'Send all required fields : tilte, author, publish'
            });
        }
        // Continue with your logic here
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

//Route for Get All books from Database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message); // Log error message in our server's console
        return response.status(500).send(error.message);
    }
});

//Route for Get One book from databaseby id
router.get('/:id', async (request, response) => {
    try {

        const {
            id
        } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message); // Log error message in our server's console
        return response.status(500).send(error.message);
    }
});

// Route for Update a book from database by id
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // Handle the error when some fields are missing
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const {
            id
        } = request.params;
        const trimmedId = id.trim(); // Trim any whitespace, including newline characters
        const result = await Book.findByIdAndUpdate(trimmedId, request.body);

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        return response.status(200).send({
            message: 'Book updated successfully'
        });

    } catch (error) {
        console.log(error.message); // Log error message in our server's console
        return response.status(500).send({
            message: error.message
        });
    }
});

// Router to Delete a book from database
router.delete('/:id', async (request, response) => {
    try {
        const {
            id
        } = request.params;
        const trimmedId = id.trim(); // Trim any whitespace, including newline characters

        const result = await Book.findByIdAndDelete(trimmedId);

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            });
        }

        return response.status(200).send({
            message: 'Book deleted successfully'
        });
    } catch (error) {
        console.log(error.message); // Log error message in our server's console
        return response.status(500).send({
            message: error.message
        });
    }
});

export default router;