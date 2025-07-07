const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Message.find()
        .then(messages => {
            res.status(200).json({
                message: 'Messages fetched successfully!',
                messages: messages
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching documents',
                error: error
            });
        });
    });

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                newMessage: createdMessage
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
    Message.findOne({ id: req.params.id })
        .then(message => {
            if(!message) {
                return res.status(404).json({
                    message: 'Message not found.',
                    error: { message: 'Message not found' }
                });
            }

            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

    message.save()
        .then(result => {
            res.status(204).json({
                message: 'Message updated successfully'
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
            message: 'Message not found.',
            error: {message: 'Message not found'}
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Message.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Message not found for deletion.',
                    error: { document: 'Message not found'}
                });
            }
            res.status(204).json({
                message: "Message deleted successfully"
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