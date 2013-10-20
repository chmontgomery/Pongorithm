(function() {
    'use strict';

    angular.module('PongorithmApp', [])
        .controller('RankingsCtrl', ['$scope', '$q', 'PlayerService', 'ModalService',
            function ($scope, $q, PlayerService, ModalService) {
                var promise = PlayerService.getAllPlayers();

                promise.then(function(players) {
                    $scope.allPlayers = players;
                }, ModalService.error);
            }]);
})();
