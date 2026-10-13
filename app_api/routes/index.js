const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// get all trips from mongodb
router.get('/trips', tripsController.tripsList);

// get a single trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;