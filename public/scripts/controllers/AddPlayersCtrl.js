'use strict';

angular.module('PongorithmApp')
    .controller('AddPlayersCtrl',
    function ($scope, $location, PlayerService, socketService) {

        $scope.newPlayers = "";
        $scope.saveNewPlayers = function() {
            var promise = PlayerService.savePlayers($scope.newPlayers);

            promise.then(function(players) {
                $scope.allPlayers = players;
            });
        };
        $scope.cancel = function() {
            $location.path('rankings');
        };
    });
