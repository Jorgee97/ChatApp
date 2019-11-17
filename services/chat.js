/*
 * Handler for the chat services.
*/


module.exports = function(io) { 

    io.on('connection', (socket) => {
        console.log("Client has connected.", socket.request.session.username);
        socket.emit('test', "Hello there!");

        socket.on('message', (data) => {
            // TODO: handle the data to be save to the db
            socket.broadcast.emit('new message', data);
        });


        socket.on('disconnect', (socket) => {
            console.log("Client has left.", socket.id);
        });
    });
}