'use strict';
var _ = require('lodash'),
    q = require('q'),
    Player = require('../../../models/playerModel'),
    EloService = require('../services/EloService');

module.exports = function (server) {

    /**
     * expected request body:
     *
     * { scores: { playerOne: { id: 1, score: 21}, playerTwo: { id: 1, score: 19} }
     */
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
                playerOneDefer.resolve({
                    PlayerObj: {
                        Id: player.id,
                        Rank: player.rank
                    },
                    Score: req.body.scores.playerOne.score
                });
            }
        });

        Player.findById(req.body.scores.playerTwo.id, function (err, player) {
            if (err) {
                console.log('FAILED to get player', err);
                playerTwoDefer.reject(err);
            } else {
                playerTwoDefer.resolve({
                    PlayerObj: {
                        Id: player.id,
                        Rank: player.rank
                    },
                    Score: req.body.scores.playerTwo.score
                });
            }
        });

        q.allSettled([
                playerOneDefer.promise,
                playerTwoDefer.promise
            ])
            .spread(function(playerOne, playerTwo) {
                return EloService.getNewRanking({
                    PlayerScores: [
                        playerOne.value,
                        playerTwo.value
                    ]
                });
            },function(error) {
                res.statusCode = 400;
                return res.send('Error 400: unknown error calculating new scores.');
            }).then(function(result) {
                // expected response example:
                // [{Id: "52e4bc5a4aeace0000d40f6b", Rank: 110},{Id: "52e4bc5a4aeace0000d40f6a",Rank: 90}]

                //TODO promises
                _.forEach(result, function(p) {
                    Player.findById(p.Id, function(err, playerModel) {
                        if (err) {
                            return new Error('Could not load Document');
                        } else {
                            // do your updates here
                            playerModel.rank = p.Rank;

                            playerModel.save(function(err) {
                                if (err) {
                                    console.log('error', err);
                                } else {
                                    console.log('success');
                                }
                            });
                        }
                    });
                });

                res.send('success!');
            });
    });

};
