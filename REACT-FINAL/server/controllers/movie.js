// Load required packages
var Movie = require('../models/movie');

// Create endpoint /api/movies for POSTS
exports.postMovies = function(req, res) {
  // Create a new instance of the Movie model
  var movie = new Movie();

  // Set the movie properties that came from the POST data
  movie.title = req.body.title;
  movie.director = req.body.director;
  movie.rating = req.body.rating;

  // Save the movie and check for errors
  movie.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Movie added to the locker!', data: movie });
  });
};

// Create endpoint /api/movies for GET
exports.getMovies = function(req, res) {
  // Use the Movie model to find all movie
  Movie.find(function(err, movies) {
    if (err)
      res.send(err);

    res.json(movies);
  });
};

// Create endpoint /api/movies/:movie_id for GET
exports.getMovie = function(req, res) {
  // Use the Movie model to find a specific movie
  Movie.findById(req.params.movie_id, function(err, movie) {
    if (err)
      res.send(err);

    res.json(movie);
  });
};

// Create endpoint /api/movies/:movie_id for PUT
exports.putMovie = function(req, res) {
      // Use the Movie model to find a specific movie
      Movie.findById(req.params.movie_id, function(err, movie) {
      if (err)
          res.send(err);

      // Update the existing movie quantity
      if (req.body.title != undefined && req.body.title != ''){
          movie.title = req.body.title;
      }
      if (req.body.director != undefined && req.body.director != ''){
          movie.director = req.body.director;
      }
      if (req.body.rating != undefined && req.body.rating != 0){
          movie.rating = req.body.rating;
      }

    // Save the movie and check for errors
    movie.save(function(err) {
      if (err)
        res.send(err);

      res.json(movie);
    });
  });
};

// Create endpoint /api/movies/:movie_id for DELETE
exports.deleteMovie = function(req, res) {
  // Use the Movie model to find a specific movie and remove it
  Movie.findByIdAndRemove(req.params.movie_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Movie removed from the locker!' });
  });
};
