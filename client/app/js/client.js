const angular = require('angular');

const galleryApp = angular.module('galleryApp', []);

galleryApp.controller('GalleryController', ['$scope', '$http', function($scope, $http) {
  $scope.imagegalleries = [];

  $scope.getAll = function() {
    $http.get('http://localhost:3000/api/gallery')
    .then((res) => {
      $scope.imagegalleries = res.data;
    }, (err) => {
      console.log(err);
    });
  };

  $scope.createGallery = function(gallery) {
    $http.post('http://localhost:3000/api/gallery', gallery)
    .then((res) => {
      $scope.imagegalleries.push(res.data);
      $scope.newGallery = null;
    }, (err) => {
      console.log(err);
    });
  };

  $scope.deleteGallery = function(gallery) {
    $http.delete('http://localhost:3000/api/gallery/' + gallery._id)
    .then((res) => {
      $scope.imagegalleries.splice($scope.imagegalleries.indexOf(gallery), 1);
    }, (err) => {
      console.log(err);
    });
  };
}]);
