'use strict';

module.exports = function (server) {

    server.get('/players', function (req, res) {
        var players = [
            {
                id: 1,
                name: 'Monty',
                rank: 100
            },
            {
                id: 2,
                name: 'Natural Fruit',
                rank: 120
            },
            {
                id: 3,
                name: 'The Real Cream Cheese',
                rank: 131
            },
            {
                id: 4,
                name: 'The Truth',
                rank: 81
            }
        ];
        res.json(players);
    });

    server.post('/players', function (req, res) {
        if (!req.body.hasOwnProperty('players')) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }

        console.log('saving new players:', req.body.players);

        res.json(true);
    });

};
