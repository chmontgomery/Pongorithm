var express = require('express'),
    path = require('path'),
    app = express(),
    services = require('./services');

app.configure(function() {
    // Turn down the logging activity
    //app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname,'public')));
});

var server = require('http').createServer(app).listen(9001);

var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    services.init(io, socket);
});