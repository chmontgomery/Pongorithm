'use strict';
var _ = require('lodash'),
    q = require('q'),
    Player = require('../../../models/playerModel'),
    request = require('request');

/**
 * expect the following json obj
 *
 * {
        PlayerScores: [
            {
                PlayerObj:{
                    Id:1,
                    Rank:99.9
                },
                Score:21
            },
            {
                PlayerObj:{
                    Id:2,
                    Rank:22.2
                },
                Score:11
            }
        ]
    }
 */
module.exports.getNewRanking = function (data) {
    var newRanksDefer = q.defer();

    var options = {
        uri: 'http://localhost:9226', // TODO read from config
        method: 'POST',
        body: JSON.stringify(data),
        contentType: 'application/json',
        rejectUnauthorized: false
    };

    request(options, function (err, rsp) {
        if (err || rsp.statusCode !== 200) {
            console.error(err);
            newRanksDefer.reject(err);
        }
        newRanksDefer.resolve(JSON.parse(rsp.body));
    });

    return newRanksDefer.promise;
};
