'use strict';

angular.module('PongorithmApp')
    .factory('PlayerService', function ($q, $http, ModalService, socketService) {

        var deferredGetAllPlayers;

        socketService.socket.on('allPlayers', function(data) {
            console.log(data.players);
            deferredGetAllPlayers.resolve(data.players);
        });

        var getAllPlayers = function() {
            deferredGetAllPlayers = $q.defer();
            socketService.socket.emit('getAllPlayers');
            return deferredGetAllPlayers.promise;
        };

        /**
         * @param text new line delimited list of new players
         */
        var savePlayers = function(scope, text) {
            var deferred = $q.defer();

            var players = text.split('\n');

            var playersJSON = [];

            _.each(players, function(playerName) {
                playersJSON.push({
                    id: 5 + playersJSON.length,
                    name: playerName,
                    rank: 100 // default
                });
            });

            $http({
                method: 'GET',
                url: url //TODO
            }).success(function() {
                    deferred.resolve();
                }).error(function() {
                    ModalService.error('Failed to save players. Please try again.');
                });

            return deferred.promise;
        };

        return {
            getAllPlayers: getAllPlayers,
            savePlayers: savePlayers
        };
    });
