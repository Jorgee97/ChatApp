/*
 * Handler for the chat services.
*/

// Invoking the producer in order to be used by the socket connection
const { producer } = require('./bot/producer');

module.exports = function(io) { 

    io.on('connection', (socket) => {
        console.log("Client has connected.", socket.request.session.username);
        socket.on('message', (data) => {
            // TODO: handle the data to be save to the db
            console.log(data)                    
            producer(data.message);
            socket.broadcast.emit('new message', data);
        });

        socket.on('disconnect', (socket) => {
            console.log("Client has left.", socket.id);
            //socket.broadcast.emit('user left', `${socket.request.session.username} has left the room.`);
        });
    });
}