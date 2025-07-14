const sequenceGenerator = require('./sequenceGenerator');
const Location = require('../models/location');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Location.find()
        .then(locations => {
            res.status(200).json({
                location: 'Locations fetched successfully!',
                locations: locations
            });
        })
        .catch(error => {
            res.status(500).json({
                location: 'An error occurred while fetching documents',
                error: error
            });
        });
    });

router.post('/', (req, res, next) => {
    const maxLocationId = sequenceGenerator.nextId("locations");

    const location = new Location({
        id: maxLocationId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    location.save()
        .then(createdLocation => {
            res.status(201).json({
                location: 'Location added successfully',
                newLocation: createdLocation
            });
        })
        .catch(error => {
            res.status(500).json({
                location: 'An error occurred',
                error: error
            });
        });
    });

router.put('/:id', (req, res, next) => {
    Location.findOne({ id: req.params.id })
        .then(location => {
            if(!location) {
                return res.status(404).json({
                    message: 'Location not found.',
                    error: { location: 'Location not found' }
                });
            }

            location.subject = req.body.subject;
            location.msgText = req.body.msgText;
            location.sender = req.body.sender;

    location.save()
        .then(result => {
            res.status(204).json({
                message: 'Location updated successfully'
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
            message: 'Location not found.',
            error: { location: 'Location not found'}
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Location.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Location not found for deletion.',
                    error: { location: 'Location not found'}
                });
            }
            res.status(204).json({
                message: "Location deleted successfully"
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