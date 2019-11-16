/*
 * Handler for the chat services.
*/


module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log("Client has connected.");
        socket.emit('test', "Hello there!");

        socket.on('disconnect', (socket) => {
            console.log("Client has left.", socket.id);
        });
    });
}