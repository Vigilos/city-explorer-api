'use strict';

const axios = require('axios');
const cache = require('./cache');

async function getMovies(req, res) {
  const url = process.env.REACT_APP_API_MOVIES_URL;

  try {
    const key = `movies-${req.query.searchQuery}`;

    if (cache[key] && Date.now() - cache[key].timeStamp < 300000) {
      console.log('Cache hit!');
      res.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss!');
      const foundData = await axios.get(url, {
        params: {
          api_key: process.env.MOVIE_API_KEY,
          query: req.query.searchQuery,
        },
      });

      // Save data to cache
      cache[key] = {
        timeStamp: Date.now(),
        data: ParseData(foundData.data),
      };

      res.status(200).send(ParseData(foundData.data));
    }
  } catch (error) {
    console.log(`Query failed! ${error.message}`);
    res
      .status(500)
      .send(`Error occurred on server: ${error.code} - ${error.message}`);
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

const ParseData = data => {
  return data.results.map(movies => new Movies(movies));
};

module.exports = getMovies;
