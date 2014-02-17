'use strict';
var _ = require('lodash'),
    q = require('q'),
    Player = require('../../../models/playerModel'),
    request = require('request'),
    fs = require('fs');

function _getEloConfig() {
    var deferred = q.defer();
    fs.readFile('src/services/elo/src/config.json', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(JSON.parse(data));
        }
    });
    return deferred.promise;
}

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
    var deferred = q.defer();

    _getEloConfig()
        .then(function (config) {

            var options = {
                uri: 'http://' + config.url,
                method: 'POST',
                body: JSON.stringify(data),
                contentType: 'application/json',
                rejectUnauthorized: false
            };

            request(options, function (err, rsp) {
                if (err || !rsp || rsp.statusCode !== 200) {
                    err = err || 'Error reaching elo service';
                    console.error(err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(JSON.parse(rsp.body));
                }
            });

        }, function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};
