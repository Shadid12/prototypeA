import express from 'express';
import socket from 'socket.io';

var app = express();

const server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
});
