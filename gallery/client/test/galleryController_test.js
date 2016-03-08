var angular = require('angular');
require('../app/js/client');
require('angular-mocks');

describe('Gallery Controller', () => {
  var $httpBackend;
  var $scope;
  var $controllerConstructor;

  beforeEach(angular.mock.module('galleryApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $controllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('Should be able to make a gallery Controller', () => {
    var test = $controllerConstructor('GalleryController', {$scope});
    expect(typeof test).toBe('object');
    expect(Array.isArray($scope.imagegalleries)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST request', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('GalleryController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make get request to /api/gallery', () => {
      $httpBackend.expectGET('http://localhost:3000/api/gallery').respond(200, [{name: 'test gallery'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.imagegalleries.length).toBe(1);
      expect($scope.imagegalleries[0].name).toBe('test gallery');
    });

    it('should create a new gallery', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/gallery', {name: 'the sent gallery'}).respond(200, {name: 'the response gallery'});
      $scope.newGallery = {name: 'the new gallery'};
      $scope.createGallery({name: 'the sent gallery'});
      $httpBackend.flush();
      expect($scope.imagegalleries.length).toBe(1);
      expect($scope.newGallery).toBe(null);
      expect($scope.imagegalleries[0].name).toBe('the response gallery');
    });

    it('should delete a gallery', () => {
      var testDeleteGallery = {name: 'delete gallery', _id: 1};
      $scope.imagegalleries.push(testDeleteGallery);
      expect($scope.imagegalleries.indexOf(testDeleteGallery)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/gallery/1').respond(200);
      $scope.deleteGallery(testDeleteGallery);
      $httpBackend.flush();
      expect($scope.imagegalleries.indexOf(testDeleteGallery)).toBe(-1);
    });
  });
});
