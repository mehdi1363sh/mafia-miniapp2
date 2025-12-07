const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static('public'));

let players = [];

io.on('connection', (socket) => {

    socket.on('join', (name) => {
        socket.name = name;
        players.push(name);
        io.emit('players', players);
    });

    socket.on('disconnect', () => {
        players = players.filter(p => p !== socket.name);
        io.emit('players', players);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
