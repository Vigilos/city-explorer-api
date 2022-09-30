'use strict';

const axios = require('axios');
const cache = require('./cache');

async function getWeather(req, res) {
  const url = process.env.REACT_APP_API_WEATHER_URL;

  try {
    const key = `weather-${req.query.lat}-${req.query.lon}`;

    if (cache[key] && Date.now() - cache[key].timeStamp < 60000) {
      console.log('Cache hit!');
      res.status(200).send(ParseData(cache[key].data, cache[key].timeStamp));
    } else {
      console.log('Cache miss!');
      const foundData = await axios.get(url, {
        params: {
          key: process.env.WEATHER_API_KEY,
          lat: req.query.lat,
          lon: req.query.lon,
        },
      });

      // Save data to cache
      cache[key] = {
        timeStamp: Date.now(),
        data: foundData.data,
      };

      res.status(200).send(ParseData(foundData.data, cache[key].timeStamp));
    }
  } catch (error) {
    console.log(`Query failed! ${error.message}`);
    res
      .status(500)
      .send(`Error occurred on server: ${error.code} - ${error.message}`);
  }
}

class Forecast {
  constructor(date, description, timeStamp) {
    this.date = date;
    this.description = description;
    this.timeStamp = new Date(timeStamp).toString();
  }
}

const ParseData = (data, timeStamp) => {
  let sendData = data.data.map(
    weather =>
      new Forecast(
        weather.valid_date,
        `Low of ${weather.low_temp}, high of ${weather.high_temp} with ${weather.weather.description}`,
        timeStamp
      )
  );
  return sendData;
};

module.exports = getWeather;
