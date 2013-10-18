var express = require('express'),
    path = require('path'),
    app = express(),
    socket;

app.configure(function() {
    // Turn down the logging activity
    //app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname,'public')));

    app.use(express.bodyParser());

    app.get('/players', function(req, res) {
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

    app.post('/players', function(req, res) {
        if(!req.body.hasOwnProperty('players')) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }

        console.log('saving new players:', req.body.players);

        res.json(true);
    });

    app.post('/score', function(req, res) {
        if(!req.body.hasOwnProperty('scores')) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }

        console.log('scores:', req.body.scores);

        socket.emit('newScore', { message: "New score added!" });

        res.json(true);
    });
});

var server = require('http').createServer(app).listen(9001);

var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level', 1);

io.sockets.on('connection', function (aSocket) {
    socket = aSocket;
    console.log('a client connected');
    socket.emit('connected', { message: "You are connected!" });
});