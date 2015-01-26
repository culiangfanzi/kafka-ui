'use strict';

angular.module('kafkaUiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('topics', {
        url: '/topics',
        templateUrl: 'app/main/topics.html',
        controller: 'TopicsCtrl'
      })
      .state('consumers', {
        url: '/consumers',
        templateUrl: 'app/main/consumers.html',
        controller: 'ConsumersCtrl'
      });
  });
