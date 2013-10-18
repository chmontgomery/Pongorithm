'use strict';

angular.module('PongorithmApp')
  .factory('ScoreService', function ($q) {


    var saveScore = function(scope) {
        var deferred = $q.defer();

        // TODO service call
        setTimeout(function() {
            scope.$apply(function() {

                deferred.resolve();
            });
        }, 200);

        return deferred.promise;
    };

    return {
        saveScore: saveScore
    };
  });
