var io;
var socket;

exports.init = function(sio, ssocket) {
    io = sio;
    socket = ssocket;
    socket.emit('connected', { message: "You are connected!" });

    // Player Events
    socket.on('getAllPlayers', getAllPlayers);
    socket.on('savePlayers', savePlayers);
    socket.on('saveScore', saveScore);
}

function getAllPlayers() {
    console.log('getAllPlayers called!');
    this.emit('allPlayers', { players: [
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
    ]});
}

function savePlayers(data) {
    console.log('savePlayers called!');
    this.emit('playersSaved', { message: "successfully saved new players" });
}

function saveScore() {
    console.log('saveScore called!');
    this.emit('scoreSaved', { message: "successfully saved score" });
}