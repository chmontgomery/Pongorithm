'use strict';

module.exports = function (server) {

    server.post('/score', function (req, res) {
        if (!req.body.hasOwnProperty('scores')) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }

        console.log('scores:', req.body.scores);

        // 1. db find players
        // 2. call go service
        // 3. update db with result

        res.json(true);
    });

};
