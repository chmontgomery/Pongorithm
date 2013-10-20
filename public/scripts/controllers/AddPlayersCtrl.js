(function() {
    'use strict';

    angular.module('PongorithmApp', ['common.services'])
        .controller('AddPlayersCtrl', ['$scope', '$location', 'PlayerService', 'ModalService',
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
