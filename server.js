'use strict';

require('dotenv').config();

// Express server
const express = require('express');
// Allows for cross origin resource sharing
const cors = require('cors');

const axios = require('axios');

const { response } = require('express');

// Import modules
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

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
