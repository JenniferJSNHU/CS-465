const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// retrieve all trips from mongodb
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// retrieve a single trip by its code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        }).exec();

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// create a new trip in mongodb
const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        return res.status(201).json(trip);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Trip code already exists' });
        }

        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({ message: err.message });
        }

        return res.status(500).json({ message: err.message });
    }
};

// update an existing trip by its code
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    ).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Trip code already exists' });
    }

    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

// delete an existing trip by its code
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json({
      message: 'Trip deleted successfully',
      trip
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// export the api controller
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};