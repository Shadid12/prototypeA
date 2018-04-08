import express from 'express';
import socket from 'socket.io';

var app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function(){
    console.log('server is running on port 5000')
});

const io = socket(server);

io.set('origins', '*:*');

io.on('connection', (socket) => {
    console.log(socket.id);
    
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    });

    
});
