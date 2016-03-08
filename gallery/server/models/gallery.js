const mongoose = require('mongoose');

var imageGallery = new mongoose.Schema({
  name: String,
  urlLink: String,
  description: String
});

module.exports = exports = mongoose.model('imageGallery', imageGallery);
