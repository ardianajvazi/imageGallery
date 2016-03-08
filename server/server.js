const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/imageGallery_app');

const galleryRouter = require(__dirname + '/routes/image_gallery_routes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

app.use('/api', galleryRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
