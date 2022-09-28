'use strict';

require('dotenv').config();

// Express server
const express = require('express');
// Allows for cross origin resource sharing
const cors = require('cors');
// Load data
const data = require('./data/weather.json');
//Start Express Server
const app = express();

// Middleware
app.use(cors());

// Declare port
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Endpoints
app.get('/weather', (req, res) => {
  try {
    let foundData = data.find(
      city =>
        city.city_name.toLowerCase() == req.query.searchQuery.toLowerCase()
      // &&
      // city.lat == req.query.lat &&
      // city.lon == req.query.lon
    );
    if (!foundData) {
      foundData.data = false;
      console.log('Search criteria not found in data!');
    }
    res.send(ParseData(foundData.data));
  } catch (error) {
    console.log('Query failed!');
    res.send([{ Code: 500, Message: `${error.message}` }]);
  }
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

const ParseData = data => {
  let cityWeather = [];
  data.forEach(item => {
    cityWeather.push(
      new Forecast(
        item.valid_date,
        `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`
      )
    );
  });
  return cityWeather;
};
