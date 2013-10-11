'use strict';

angular.module('PongorithmApp')
  .controller('RankingsCtrl', function ($scope, PlayerService) {
  		$scope.allPlayers = PlayerService.getAllPlayers();
  });
