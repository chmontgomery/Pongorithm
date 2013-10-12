'use strict';

angular.module('PongorithmApp')
  .factory('PlayerService', function ($q) {

  	var getAllPlayers = function() {
  		// TODO service call
        var players = JSON.parse(localStorage["Pongorithm.players"]);
  		return _.union(players, [
  			{
          id: 1,
  				name: 'Monty',
  				rank: 100
  			},
  			{
          id: 2,
  				name: 'Natural Fruit',
  				rank: 120
  			},
  			{
          id: 3,
  				name: 'The Real Cream Cheese',
  				rank: 131
  			},
  			{
          id: 4,
  				name: 'Cheese head',
  				rank: 81
  			}
  		]);
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

        // TODO service call
        setTimeout(function() {
            scope.$apply(function() {
                localStorage["Pongorithm.players"] = JSON.stringify(playersJSON);
                deferred.resolve();
            });
        }, 200);

        return deferred.promise;
    };

    return {
        getAllPlayers: getAllPlayers,
        savePlayers: savePlayers
    };
  });
