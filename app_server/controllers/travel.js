/* GET travel page */
const fs = require('fs');

// read trip data from the json file
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// render the travel page with trip data
const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways', trips });
};

// export the travel controller
module.exports = {
  travel
};