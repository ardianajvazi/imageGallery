const express = require('express');
const jsonParser = require('body-parser').json();
const Gallery = require(__dirname + '/../models/gallery');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var galleryRouter = module.exports = exports = express.Router();

galleryRouter.get('/gallery', (req, res) => {
  Gallery.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

galleryRouter.post('/gallery', jsonParser, (req, res) => {
  var newImage = new Gallery(req.body);
  newImage.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

galleryRouter.delete('/gallery/:id', (req, res) => {
  Gallery.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'success'});
  });
});
