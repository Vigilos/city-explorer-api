'use strict';

const axios = require('axios');

async function getMovies(req, res) {
  const url = process.env.REACT_APP_API_MOVIES_URL;

  try {
    const foundData = await axios.get(url, {
      params: {
        api_key: process.env.MOVIE_API_KEY,
        query: req.query.searchQuery,
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
