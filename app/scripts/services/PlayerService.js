'use strict';

angular.module('PongorithmApp')
  .factory('PlayerService', function () {
    
  	var getAllPlayers = function() {
  		// TODO
  		return [
  			{
  				name: 'Monty',
  				rank: 100
  			},
  			{
  				name: 'Natural Fruit',
  				rank: 120
  			},
  			{
  				name: 'The Real Cream Cheese',
  				rank: 131
  			},
  			{
  				name: 'Cheese head',
  				rank: 81
  			}
  		];
  	};

    return {
        getAllPlayers: getAllPlayers
    };
  });
