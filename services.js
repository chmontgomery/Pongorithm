var io;
var socket;

exports.init = function(sio, ssocket) {
    io = sio;
    socket = ssocket;
    socket.emit('connected', { message: "You are connected!" });

    socket.on('getAllPlayers', getAllPlayers);
    socket.on('savePlayers', savePlayers);
    socket.on('saveScore', saveScore);
}

function getAllPlayersFromDB() {
    return [
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
}

function getAllPlayers() {
    console.log('getAllPlayers called!');
    this.emit('allPlayers', { players: getAllPlayersFromDB() });
}

function savePlayers(data) {
    console.log('savePlayers called!', data);
    // TODO
    this.emit('playersSaved', { message: "successfully saved new players", players: getAllPlayersFromDB() });
}

function saveScore() {
    console.log('saveScore called!');
    this.emit('scoreSaved', { message: "successfully saved score" });
}