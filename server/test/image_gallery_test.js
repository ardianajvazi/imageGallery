const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/image_gallery_tests';
require(__dirname + '/../server');
require(__dirname + '/../models/gallery');
const request = chai.request;
const origin = 'localhost:3000';
const url = '/api/gallery';

describe('The Image Gallery API', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('Should be able to get all from galleries from database', (done) => {
    request(origin)
    .get(url)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('Should be able to create a new gallery with post', () => {
    request(origin)
    .post(url)
    .send({name: 'First gallery', urlLink: 'http://www.google.com', description: 'This is my first gallery'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('First gallery');
      expect(res.body.urlLink).to.eql('http://www.google.com');
      expect(res.body.description).to.eql('This is my first gallery');
      expect(res.body).to.have.property('_id');
    });
  });
});
