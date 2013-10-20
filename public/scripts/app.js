(function() {
    'use strict';

    var app = angular.module('PongorithmApp', [
        'PongorithmApp.directives',
        'common.filters',
        'lib.io'
    ]);

    app.config(['io', '$routeProvider', function (io, $routeProvider) {
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

        var socketService = {
            socket: io.connect()
        };

        socketService.socket.on('connected', function(data) {
            console.log(data.message);
        });

        socketService.socket.on('newScore', function(data) {
            console.log(data.message);
        });
    }]);
})();
