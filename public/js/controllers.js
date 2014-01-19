(function() {
    'use strict';

    var module = angular.module('PongorithmApp.controllers', [
        'PongorithmApp.services.score',
        'PongorithmApp.services.player',
        'PongorithmApp.services.modal'
    ]);

    module.controller('RankingsCtrl', ['$scope', '$q', 'PlayerService', 'ModalService',
        function ($scope, $q, PlayerService, ModalService) {
            var promise = PlayerService.getAllPlayers();

            promise.then(function(players) {
                $scope.allPlayers = players;
            }, ModalService.error);
        }]);

    module.controller('AddScoreCtrl', ['$scope', '$location', 'PlayerService', 'ScoreService', 'ModalService',
        function ($scope, $location, PlayerService, ScoreService, ModalService) {
            $scope.playerOneScore = 0;
            $scope.playerTwoScore = 0;
            $scope.playerOneId = null;
            $scope.playerTwoId = null;
            var promise = PlayerService.getAllPlayers();

            promise.then(function(players) {
                $scope.allPlayers = players;
            }, ModalService.error);

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
                }, ModalService.error);
            };
            $scope.cancel = function() {
                $location.path('rankings');
            };
        }]);

    module.controller('AddPlayersCtrl', ['$scope', '$location', 'PlayerService', 'ModalService',
        function ($scope, $location, PlayerService, ModalService) {

            $scope.newPlayers = "";
            $scope.saveNewPlayers = function() {
                var promise = PlayerService.savePlayers($scope.newPlayers);

                promise.then(function(players) {
                    $location.path('rankings');
                }, ModalService.error);
            };
            $scope.cancel = function() {
                $location.path('rankings');
            };
        }]);
})();
