'use strict';

angular.module('PongorithmApp', ['PongorithmApp.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rankings', {
        templateUrl: 'views/rankings.html',
        controller: 'RankingsCtrl'
      })
      .when('/addPlayers', {
        templateUrl: 'views/addPlayers.html',
        controller: 'AddPlayerCtrl'
      })
      .when('/addScore', {
        templateUrl: 'views/addScore.html',
        controller: 'AddScoreCtrl'
      })
      .otherwise({
        redirectTo: '/rankings'
      });
  });
