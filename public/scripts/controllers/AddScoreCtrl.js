'use strict';

angular.module('PongorithmApp')
    .controller('AddScoreCtrl', function ($scope, $location, PlayerService, ScoreService) {
        $scope.playerOneScore = 0;
        $scope.playerTwoScore = 0;
        $scope.playerOneId = null;
        $scope.playerTwoId = null;
        var promise = PlayerService.getAllPlayers();

        promise.then(function(players) {
            $scope.allPlayers = players;
        }, function(reason) {
            // TODO show error
        });

        $scope.saveScore = function() {
            var scorePromise = ScoreService.saveScore({
                id: $scope.playerOneId,
                score: $scope.playerOneScore
            },{
                id: $scope.playerTwoId,
                score: $scope.playerTwoScore
            });

            scorePromise.then(function() {
                $location.path('rankings');
            }, function(reason) {
                //TODO
            })
        };
        $scope.cancel = function() {
            $location.path('rankings');
        };
    });