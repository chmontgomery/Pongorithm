(function() {
    'use strict';

    angular.module('PongorithmApp', ['common.services'])
        .controller('AddScoreCtrl', ['$scope', '$location', 'PlayerService', 'ScoreService', 'ModalService',
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
})();
