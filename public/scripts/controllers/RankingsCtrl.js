'use strict';

angular.module('PongorithmApp')
    .controller('RankingsCtrl', function ($scope, $q, PlayerService) {
        var promise = PlayerService.getAllPlayers();

        promise.then(function(players) {
            $scope.allPlayers = players;
        });
    });
