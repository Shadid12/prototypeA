import express from 'express';
import socket from 'socket.io';

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

const server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    });

    
});
