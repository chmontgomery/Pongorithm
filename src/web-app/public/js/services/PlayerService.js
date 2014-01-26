(function() {
    'use strict';
    angular.module('PongorithmApp.services.player', [
            'lib.lodash'
        ])
        .factory('PlayerService', [
            '$q', '$http', '_',
            function ($q, $http, _) {

                var getAllPlayers = function() {
                    var deferred = $q.defer();

                    $http.get('/players').success(function(data) {
                        deferred.resolve(data);
                    });

                    return deferred.promise;
                };

                /**
                 * @param text new line delimited list of new players
                 */
                var savePlayers = function(text) {
                    var deferred = $q.defer();

                    var players = text.split('\n');

                    var playersJSON = [];

                    _.each(players, function(playerName) {
                        playersJSON.push({
                            name: playerName,
                            rank: 100 // default
                        });
                    });

                    $http.post('/players', { players: playersJSON }).success(function() {
                        deferred.resolve();
                    });

                    return deferred.promise;
                };

                return {
                    getAllPlayers: getAllPlayers,
                    savePlayers: savePlayers
                };
            }]);
})();