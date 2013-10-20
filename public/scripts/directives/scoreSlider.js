(function() {
    'use strict';

    angular.module('PongorithmApp.directives', [])
        .directive('scoreSlider', function() {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    playerScore: '=',
                    playerId: '=',
                    allPlayers: '='
                },
                controller: function($scope) {
                    $scope.autoIncrement = function(num) {
                        $scope.playerScore = num;
                    };
                    $scope.selectPlayer = function(playerId) {
                        $scope.playerId = playerId;
                    };
                    $scope.isDim = function(playerId) {
                        return $scope.playerId !== null && playerId !== $scope.playerId;
                    };
                },
                templateUrl: 'partials/scoreSlider.html',
                link: function(scope, iElement, iAttrs, controller) {
                    iElement.find('.score-slider').slider({
                        value: scope.playerScore,
                        min: 0,
                        max: 31,
                        step: 1,
                        slide: function( event, ui ) {
                            scope.$apply(function() {
                                scope.playerScore = ui.value;
                            });
                        }
                    });
                    scope.$watch('playerScore', function(newVal, oldVal){
                        iElement.find('.score-slider').slider('value', newVal);
                    });
                }
            };
        });
})();
