/*
 * Handler for the chat services.
*/

// Invoking the producer in order to be used by the socket connection
const { producer } = require('./bot/producer');
const Messages = require('../models/message.js')

const prefix = '/stock=';


const validateUsername = (socket) =>  {
    if (socket.request.session.username == undefined) {
        socket.emit('user is disconnected')
    }
}

const getLastMessages = (limit, socket) => {
    Messages
    .find()
    .sort({ created_at: 1 })
    .limit(limit)
    .then(msgs => {
        socket.emit('old messages', msgs)
    })
    .catch(err => {
        console.log(err); // Need to log and notify user if error happend.
    });
};

const notifyUserConnected = (socket) => {
    socket.broadcast.emit('user connected', `${socket.request.session.username} has connected.`);
};

const notifyUserDisconnected = (socket) => {
    socket.broadcast.emit('user disconnected', `${socket.request.session.username} has disconnected.`);
};

module.exports = function(io, app) { 
    io.on('connection', (socket) => {        
        /**
         * I validate if the user has a current session, if not, i send them to the login page.
         */    
        validateUsername(socket);
        getLastMessages(50, socket);
        notifyUserConnected(socket);
        socket.on('message', (data) => {
            validateUsername(socket); // Hardcoded work around, need to validate with a better approach.
            /* 
            * The producer will take the message that the user sent and evaluate
            * wheater or not it's a stock message, then it triggers the message to the consumer
            * and finally the boker returns the final message 
            * if the stock exist or a message indicating that the command doesn't exist
            */
            producer(data.message);

            /**
             * Assigning the username to the data to be saved to the database
             * depending on the content of the message. I mean if the message is not a stock command.
             */
            data.username = socket.request.session.username;
            if (!data.message.includes(prefix))
                Messages.create({ username: data.username, message: data.message });                

            /**
             * Finally after the validations the message is sent to the clients in the chat room.
             */
            socket.broadcast.emit('new message', data);
        });

        socket.on('disconnect', () => {
            console.log("Client has left.", socket.request.session.username);
            notifyUserDisconnected(socket);
        });
    });
}