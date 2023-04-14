const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const ser =app.listen(4000);

const io = require("socket.io")(ser, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('A User Connected');
    socket.on('send-message', (message) => {
        socket.broadcast.emit('recieve-message', message);
    })
})

/* app.listen(4000, () => {
    console.log("App is listening on localhost:4000")
}) */