'use strict';
var _ = require('lodash'),
    q = require('q'),
    Player = require('../../../models/playerModel');

module.exports = function (server) {

    server.post('/score', function (req, res) {
        if (!req.body.hasOwnProperty('scores')) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }

        console.log('Saving new scores:', req.body.scores);

        var playerOneDefer = q.defer();
        var playerTwoDefer = q.defer();

        Player.findById(req.body.scores.playerOne.id, function (err, player) {
            if (err) {
                console.log('FAILED to get player', err);
                playerOneDefer.reject(err);
            } else {
                playerOneDefer.resolve(player);
            }
        });

        Player.findById(req.body.scores.playerTwo.id, function (err, player) {
            if (err) {
                console.log('FAILED to get player', err);
                playerTwoDefer.reject(err);
            } else {
                playerTwoDefer.resolve(player);
            }
        });

        q.allSettled([
                playerOneDefer.promise,
                playerTwoDefer.promise
            ])
            .spread(function(playerOne, playerTwo) {
                var newRanksDefer = q.defer();
                newRanksDefer.resolve();
                console.log('TODO call go service');
                return newRanksDefer.promise;
            },function(error) {
                // ?
                res.json(false);
            }).then(function(result) {
                console.log('TODO update db with result');
                res.json(true);
            });
    });

};
