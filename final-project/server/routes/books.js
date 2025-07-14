const sequenceGenerator = require('./sequenceGenerator');
const Book = require('../models/book');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Book.find()
        .then(books => {
            console.log('DEBUG: Books fetched from DB by Mongoose:', books)
            res.status(200).json({
                message: 'Books fetched successfully!',
                books: books
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching books',
                error: error
            });
        });
    });

router.post('/', (req, res, next) => {
    const maxBookId = sequenceGenerator.nextId("books");

    const book = new Book({
        id: maxBookId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        release: req.body.release,
        children: req.body.children
    });

    book.save()
        .then(createdBook => {
            res.status(201).json({
                message: 'Book added successfully',
                book: createdBook
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
    });

router.put('/:id', (req, res, next) => {
    Book.findOne({ id: req.params.id })
        .then(book => {
            if(!book) {
                return res.status(404).json({
                    message: 'Book not found.',
                    error: { book: 'Book not found' }
                });
            }

            book.name = req.body.name;
            book.description = req.body.description;
            book.url = req.body.url;
            book.release = req.body.release;
            book.children = req.body.children;

    book.save()
        .then(result => {
            res.status(204).json({
                message: 'Book updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred trying to find book for update.',
            error: error
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Book.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Book not found for deletion.',
                    error: { book: 'Book not found'}
                });
            }
            res.status(204).json({
                message: "Book deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        })
    });

module.exports = router; 