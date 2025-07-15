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

router.post('/', async (req, res, next) => {
    console.log('[DEBUG-LOCATIONS-POST] --- Starting new location POST request ---');
    console.log('[DEBUG-LOCATIONS-POST] Received body:', req.body);

    let maxLocationId;
    try{
        maxLocationId = await sequenceGenerator.nextId("locations");
        if (maxLocationId === undefined || maxLocationId === null) {
            throw new Error('sequenceGenerator.nextId returned undefined or null for locations. ');  
        }
    } catch (sequenceError) {
        console.error('[DEBUG-LOCATIONS-POST] ERROR: sequenceGenerator for locations failed!', sequenceError);
        return res.status(500).json({
            message: 'Failed to generate location ID.',
            error: sequenceError.message || sequenceError
        });
    }

    let location;
    try{
        location = new Location({
            id: maxLocationId,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
        });
        console.log('[DEBUG-LOCATIONS-POST] Location instance created with ID:', location.id, 'Full object:', location);

        const createdLocation = await location.save();
        console.log('[DEBUG-LOCATIONS-POST] Location saved successfully:', createdLocation);
        return res.status(201).json({
            message: 'Location added successfully',
            document: createdLocation
        });
    } catch (error) {
        console.error('DEBUG-LOCATIONS-POST] ERROR saving location (Mongoose catch):', error);

        let errorMessage = 'AN error occurred while saving the location to the database.';
        if (error.name === 'Validation Error') {
            errorMessage = 'Validation failed: ' + error.message;
        } else if (error.code === 11000) {
            errorMessage = 'Duplicate entry for location ID or unique field.';
        }
    }         
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