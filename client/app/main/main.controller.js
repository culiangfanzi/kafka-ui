'use strict';

angular.module('kafkaUiApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.controller = {};

    $http.get('/api/kafka/controller').success(function(result) {
      if (result.status == "success") $scope.controller = result.data;
    });

  })
  .controller('TopicsCtrl', function ($scope, $http, $timeout) {
    $scope.topics = {};

    $scope.loadData = function () {
      $http.get('/api/kafka/topics').success(function(result) {
        if (result.status == "success") $scope.topics = result.data;
      });
      $timeout(function() { $scope.loadData(); }, 900);
    };
    $scope.loadData();

  })
  .controller('ConsumersCtrl', function ($scope, $http, $timeout) {
    $scope.consumers = {};

    $scope.loadData = function () {
      console.log('reload data');
      $http.get('/api/kafka/consumers').success(function(result) {
        if (result.status == "success") $scope.consumers = result.data;
      });
      $timeout(function() { $scope.loadData(); }, 900);
    };
    $scope.loadData();


  });
