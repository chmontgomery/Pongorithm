'use strict';

angular.module('PongorithmApp')
  .factory('ScoreService', function ($q, $http) {


    var saveScore = function(playerOne, playerTwo) {
        var deferred = $q.defer();

        $http.post('/score', { scores: { playerOne: playerOne, playerTwo: playerTwo } }).success(function() {
            deferred.resolve();
        });

        return deferred.promise;
    };

    return {
        saveScore: saveScore
    };
  });
