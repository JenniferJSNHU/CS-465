const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// get all trips from mongodb
router.get('/trips', tripsController.tripsList);

// get a single trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// add a new trip to mongodb
router.post('/trips', tripsController.tripsAddTrip);

// update an existing trip by its code
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

// delete an existing trip by its code
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;