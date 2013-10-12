'use strict';

angular.module('PongorithmApp')
.controller('AddPlayersCtrl',
    function ($scope, $location, PlayerService, $q) {
        $scope.newPlayers = "";
        $scope.saveNewPlayers = function() {
            var promise = PlayerService.savePlayers($scope, $scope.newPlayers);
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
