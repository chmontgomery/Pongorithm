'use strict';
var _ = require('lodash'),
    q = require('q'),
    Player = require('../../../models/playerModel');

module.exports = function (server) {

    server.get('/players', function (req, res) {
        Player.find(function (err, players) {
            if (err) {
                console.log(err);
            }
            res.json(players);
        });
    });

    server.post('/players', function (req, res) {
        if (!req.body.hasOwnProperty('players')) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }

        console.log('saving new player(s):', req.body.players);

        var deferreds = [];

        _.forEach(req.body.players, function(player) {
            var deferred = q.defer();
            deferreds.push(deferred.promise);
            var newPlayer = new Player(player);
            newPlayer.save(function (err) {
                if (err) {
                    console.log('FAILED to save player', err);
                    deferred.reject(err);
                } else {
                    deferred.resolve();
                }
            });
        });

        q.all(deferreds)
            .then(function() {
                res.json(true);
            },function(error) {
                res.json(false);
            });
    });

};
