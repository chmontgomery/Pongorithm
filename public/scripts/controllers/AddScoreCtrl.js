'use strict';

angular.module('PongorithmApp')
.controller('AddScoreCtrl', function ($scope, $location, PlayerService, ScoreService) {
    $scope.playerOneScore = 0;
    $scope.playerTwoScore = 0;
    $scope.allPlayers = PlayerService.getAllPlayers();
    $scope.saveScore = function() {
        var promise = ScoreService.saveScore($scope);
        promise.then(function() {
            $location.path('rankings');
        }, function(reason) {
            console.log('save failed!');
        });
    };
    $scope.cancel = function() {
       $location.path('rankings');
    };
});