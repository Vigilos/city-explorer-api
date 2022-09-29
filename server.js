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
app.get('/movies', getMovies);

async function getWeather(req, res) {
  const url = process.env.REACT_APP_API_WEATHER_URL;

  try {
    const foundData = await axios.get(url, {
      params: {
        key: process.env.WEATHER_API_KEY,
        lat: req.query.lat,
        lon: req.query.lon,
      },
    });
    res.status(200).send(ParseData(foundData.data), 'weather');
  } catch (error) {
    console.log(`Query failed! ${error.message}`);
    res
      .status(500)
      .send(`Error occurred on server: ${error.code} - ${error.message}`);
  }
}

async function getMovies(req, res) {
  const url = process.env.REACT_APP_API_MOVIES_URL;

  try {
    const foundData = await axios.get(url, {
      params: {
        api_key: process.env.MOVIE_API_KEY,
        query: req.query.searchQuery,
      },
    });
    res.status(200).send(ParseData(foundData.data, 'movies'));
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

class Movies {
  constructor(obj) {
    (this.title = obj.title),
      (this.overview = obj.overview),
      (this.average_votes = obj.average_votes),
      (this.total_votes = obj.vote_count),
      (this.image_url =
        'https://image.tmdb.org/t/p/original' + obj.poster_path),
      (this.popularity = obj.popularity),
      (this.released_on = obj.release_date);
  }
}

const ParseData = (data, type) => {
  if (type == 'weather') {
    return data.data.map(
      weather =>
        new Forecast(
          weather.valid_date,
          `Low of ${weather.low_temp}, high of ${weather.high_temp} with ${weather.weather.description}`
        )
    );
  }
  if (type == 'movies') {
    return data.results.map(movies => new Movies(movies));
  }
};
