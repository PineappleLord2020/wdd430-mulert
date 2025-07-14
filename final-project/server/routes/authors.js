const sequenceGenerator = require('./sequenceGenerator');
const Author = require('../models/author');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Author.find()
        .populate('group')
        .then(authors => {
            res.status(200).json({
                message: 'Authors fetched successfully!',
                authors: authors
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching authors',
                error: error
            });
        });
    });

router.post('/', (req, res, next) => {
    const maxAuthorId = sequenceGenerator.nextId("Authors");

    const author = new Author({
        id: maxAuthorId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    });

    author.save()
        .then(createdAuthor => {
            res.status(201).json({
                message: 'Author added successfully',
                document: createdAuthor
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
    Author.findOne({ id: req.params.id })
        .then(author => {
            if(!author) {
                return res.status(404).json({
                    message: 'Author not found.',
                    error: { author: 'Author not found' }
                });
            }

            author.name = req.body.name;
            author.email = req.body.email;
            author.phone = req.body.phone;
            author.imageUrl = req.body.imageUrl;
            author.group = req.body.group;

    author.save()
        .then(result => {
            res.status(204).json({
                message: 'Author updated successfully'
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
            message: 'An error occurred trying to find author for update.',
            error: error
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Author.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Author not found for deletion.',
                    error: { author: 'Author not found'}
                });
            }
            res.status(204).json({
                message: "Author deleted successfully"
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