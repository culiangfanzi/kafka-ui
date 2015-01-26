'use strict';

angular.module('kafkaUiApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
      'title': 'Home',
      'link': '/'
      },
      {
        'title': 'Topics',
        'link': '/topics'
      },
      {
        'title': 'Consumers',
        'link': '/consumers'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
