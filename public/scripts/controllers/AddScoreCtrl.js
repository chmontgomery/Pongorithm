'use strict';

angular.module('PongorithmApp')
    .controller('AddScoreCtrl', function ($scope, $location, PlayerService, ScoreService) {
        $scope.playerOneScore = 0;
        $scope.playerTwoScore = 0;
        var promise = PlayerService.getAllPlayers();

        promise.then(function(players) {
            $scope.allPlayers = players;
        });

        $scope.saveScore = function() {
            ScoreService.saveScore($scope);
        };
        $scope.cancel = function() {
            $location.path('rankings');
        };
    });