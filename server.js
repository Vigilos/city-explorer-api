'use strict';

require('dotenv').config();

// Express server
const express = require('express');
// Allows for cross origin resource sharing
const cors = require('cors');

const axios = require('axios');

const { response } = require('express');

//Start Express Server
const app = express();

// Middleware
app.use(cors());

// Declare port
const PORT = process.env.PORT || 3002;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Endpoints
app.get('/weather', getWeather);

async function getWeather(req, res) {
  const url = process.env.REACT_APP_API_URL;

  try {
    const foundData = await axios.get(url, {
      params: {
        key: process.env.WEATHER_API_KEY,
        lat: req.query.lat,
        lon: req.query.lon,
      },
    });
    res.status(200).send(ParseData(foundData.data));
  } catch (error) {
    console.log(`Query failed! ${error.message}`);
    res
      .status(500)
      .send(`Error occurred on server: ${error.code} - ${error.message}`);
  }
}

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

const ParseData = data => {
  return data.data.map(
    weather =>
      new Forecast(
        weather.valid_date,
        `Low of ${weather.low_temp}, high of ${weather.high_temp} with ${weather.weather.description}`
      )
  );
};
