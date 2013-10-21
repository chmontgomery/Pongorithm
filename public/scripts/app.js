(function() {
    'use strict';

    var app = angular.module('PongorithmApp', [
        'PongorithmApp.directives',
        'PongorithmApp.controllers',
        'PongorithmApp.filters'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/rankings', {
                templateUrl: 'views/rankings.html',
                controller: 'RankingsCtrl'
            })
            .when('/addPlayers', {
                templateUrl: 'views/addPlayers.html',
                controller: 'AddPlayersCtrl'
            })
            .when('/addScore', {
                templateUrl: 'views/addScore.html',
                controller: 'AddScoreCtrl'
            })
            .otherwise({
                redirectTo: '/rankings'
            });

        /*var socketService = {
            socket: io.connect()
        };

        socketService.socket.on('connected', function(data) {
            console.log(data.message);
        });

        socketService.socket.on('newScore', function(data) {
            console.log(data.message);
        });*/
    }]);
})();
