const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json({
                message: 'Contacts fetched successfully!',
                contacts: contacts
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching contacts',
                error: error
            });
        });
    });

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("Contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                document: createdContact
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
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            if(!contact) {
                return res.status(404).json({
                    message: 'Contact not found.',
                    error: { contact: 'Contact not found' }
                });
            }

            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
            contact.group = req.body.group;

    contact.save()
        .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully'
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
            message: 'An error occurred trying to find contact for update.',
            error: error
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Contact.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Contact not found for deletion.',
                    error: { contact: 'Contact not found'}
                });
            }
            res.status(204).json({
                message: "Contact deleted successfully"
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