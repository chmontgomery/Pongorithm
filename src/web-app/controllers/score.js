'use strict';
var _ = require('lodash'),
    q = require('q'),
    Player = require('../../../models/playerModel'),
    eloService = require('../services/EloService');

/**
 * @param {Object} scores
 * @returns {Array}
 * @private
 */
function _getPlayerScores(scores) {
    var playerOneDefer = q.defer();
    var playerTwoDefer = q.defer();

    Player.findById(scores.playerOne.id, function (err, player) {
        if (err) {
            console.log('FAILED to get player', err);
            playerOneDefer.reject(err);
        } else {
            playerOneDefer.resolve({
                PlayerObj: {
                    Id: player.id,
                    Rank: player.rank
                },
                Score: scores.playerOne.score
            });
        }
    });

    Player.findById(scores.playerTwo.id, function (err, player) {
        if (err) {
            console.log('FAILED to get player', err);
            playerTwoDefer.reject(err);
        } else {
            playerTwoDefer.resolve({
                PlayerObj: {
                    Id: player.id,
                    Rank: player.rank
                },
                Score: scores.playerTwo.score
            });
        }
    });

    return [
        playerOneDefer.promise,
        playerTwoDefer.promise
    ];
}

/**
 * @param {Object} playerOne
 * @param {Object} playerTwo
 * @returns {Object}
 * @private
 */
function _getNewRankings(playerOne, playerTwo) {
    return eloService.getNewRanking({
        PlayerScores: [
            playerOne.value,
            playerTwo.value
        ]
    });
}

/**
 * @param {Array} result
 * @returns {Array} promises from finding and saving players
 * @private
 */
function _saveNewRankings(result) {
    // expected response example:
    // [{Id: "52e4bc5a4aeace0000d40f6b", Rank: 110},{Id: "52e4bc5a4aeace0000d40f6a",Rank: 90}]

    var promises = [];

    _.forEach(result, function(p) {
        var deferred = q.defer();

        Player.findById(p.Id, function(err, playerModel) {
            if (err) {
                deferred.reject(err);
            } else {
                playerModel.rank = p.Rank;
                playerModel.save(function(saveErr) {
                    if (saveErr) {
                        deferred.reject(saveErr);
                    } else {
                        deferred.resolve();
                    }
                });
            }
        });

        promises.push(deferred.promise);
    });

    return promises;
}

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

        q.allSettled(_getPlayerScores(req.body.scores))
            .spread(_getNewRankings)
            .then(_saveNewRankings)
            .spread(function() {
                res.statusCode = 200;
                res.send('Successfully saved new scores');
            }).fail(function(error) {
                console.error(error);
                res.statusCode = 400;
                return res.send('Error 400: error saving scores');
            });
    });
};
