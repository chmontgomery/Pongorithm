'use strict';

angular.module('PongorithmApp')
    .controller('RankingsCtrl', function ($scope, PlayerService) {
        var promise = PlayerService.getAllPlayers();
        promise.then(function(players) {
            $scope.allPlayers = players;
        }, function() {
            console.log('get all players failed!');
        });
    });
