/* GET travel page */

// api endpoint for retrieving trips
const tripsEndpoint = 'http://localhost:3000/api/trips';

// retrieve trip data from the api
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    let trips = await response.json();
    let message = null;

    // handle invalid or empty trip data
    if (!Array.isArray(trips)) {
      message = 'API lookup error';
      trips = [];
    } else if (trips.length === 0) {
      message = 'No trips exist in the database!';
    }

    // render the travel page with api data
    res.render('travel', {
      title: 'Travlr Getaways',
      trips,
      message
    });
  } catch (err) {
    console.error('Travel API error:', err.message);
    res.status(500).render('travel', {
      title: 'Travlr Getaways',
      trips: [],
      message: 'API lookup error'
    });
  }
};

// export the travel controller
module.exports = {
  travel
};
