'use strict';

angular.module('PongorithmApp.directives', [])
  .directive('navbar', function() {
        return {
            restrict: "E",
            replace: true,
            controller: function($scope, $location) {
                $scope.changeView = function(view){
                    $location.path(view); // path not hash
                };
            },
            templateUrl: 'partials/navbar.html'
        };
    });