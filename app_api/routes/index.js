const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const requireAuth = require('../middleware/auth');

// get all trips from mongodb
router.get('/trips', tripsController.tripsList);

// get a single trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// add a new trip to mongodb (authentication required)
router.post('/trips', requireAuth, tripsController.tripsAddTrip);

// update an existing trip by its code (authentication required)
router.put('/trips/:tripCode', requireAuth, tripsController.tripsUpdateTrip);

// delete an existing trip by its code (authentication required)
router.delete('/trips/:tripCode', requireAuth, tripsController.tripsDeleteTrip);

// register a new user
router.post('/register', authController.register);

// authenticate a user and return a jwt
router.post('/login', authController.login);

module.exports = router;