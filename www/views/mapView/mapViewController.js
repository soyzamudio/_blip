'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$firebaseArray', function($scope, $cordovaGeolocation, $firebaseArray) {

  var ref = new Firebase('https://blipapp.firebaseio.com/blips');
  var blips = $firebaseArray(ref);

  $scope.message = 'todd sucks'
  $scope.typing = false;
  var lat, long;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat  = position.coords.latitude;
    long = position.coords.longitude;
    console.log(JSON.stringify(lat));
    console.log(JSON.stringify(long));

    $scope.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: 14
    }
  })
  .then(function(err) {
    console.log(JSON.stringify(err));
  });

  $scope.options = { zoomControl: false, streetViewControl: false, mapTypeControl: false };

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function() {
    var obj = {message: $scope.message, lat: lat, long: long}
    blips.$add(obj).then(function(ref) {
      console.log(ref.key());
      $scope.typing = false;
    });
  }

}]);
