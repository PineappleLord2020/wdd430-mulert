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

router.post('/', async (req, res, next) => {
    console.log('[DEBUG-AUTHORS-POST] --- Starting new author POST request ---');
    console.log('[DEBUG-AUTHORS-POST] Received body:', req.body);

    let maxAuthorId;
    try{
        maxAuthorId = await sequenceGenerator.nextId("authors");
        if (maxAuthorId === undefined || maxAuthorId === null) {
            throw new Error('sequenceGenerator.nextId returned undefined or null for authors. ');  
        }
    } catch (sequenceError) {
        console.error('[DEBUG-AUTHORS-POST] ERROR: sequenceGenerator for authors failed!', sequenceError);
        return res.status(500).json({
            message: 'Failed to generate author ID.',
            error: sequenceError.message || sequenceError
        });
    }

    let author;
    try{
        author = new Author({
            id: maxAuthorId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            imageUrl: req.body.imageUrl,
            group: req.body.group
        });
        console.log('[DEBUG-AUTHORS-POST] Author instance created with ID:', author.id, 'Full object:', author);

        const createdAuthor = await author.save();
        console.log('[DEBUG-AUTHORS-POST] Author saved successfully:', createdAuthor);
        return res.status(201).json({
            message: 'Author added successfully',
            document: createdAuthor
        });
    } catch (error) {
        console.error('DEBUG-AUTHORS-POST] ERROR saving author (Mongoose catch):', error);

        let errorMessage = 'AN error occurred while saving the author to the database.';
        if (error.name === 'Validation Error') {
            errorMessage = 'Validation failed: ' + error.message;
        } else if (error.code === 11000) {
            errorMessage = 'Duplicate entry for author ID or unique field (e.g., email).';
        }
    }         
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