'use strict';

angular.module('PongorithmApp')
    .factory('PlayerService', function ($q, $http, ModalService, socketService, UtilService) {

        var deferredGet,
            deferredSave;

        socketService.socket.on('allPlayers', function(data) {
            console.log(data.players);
            deferredGet.resolve(data.players);
        });

        var getAllPlayers = function() {
            deferredGet = $q.defer();
            socketService.socket.emit('getAllPlayers');
            return deferredGet.promise;
        };

        socketService.socket.on('playersSaved', function(data) {
            console.log(data.players);
            deferredSave.resolve(data.players);
        });

        /**
         * @param text new line delimited list of new players
         */
        var savePlayers = function(text) {
            deferredSave = $q.defer();

            var players = text.split('\n');

            var playersJSON = [];

            _.each(players, function(playerName) {
                playersJSON.push({
                    id: UtilService.newGuid(),
                    name: playerName,
                    rank: 100 // default
                });
            });

            socketService.socket.emit('savePlayers', players);
            return deferredSave.promise;
        };

        return {
            getAllPlayers: getAllPlayers,
            savePlayers: savePlayers
        };
    });
