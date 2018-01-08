// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var MovieSchema   = new mongoose.Schema({
  title: String,
  director: String,
  rating: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Movie', MovieSchema);
