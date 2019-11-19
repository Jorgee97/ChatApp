/**
 * I used jQuery for simplicity and for some helper methods of the library.
 */

let chatBox = $("#chat-box");
let btnSendMessage = $("#send-message");
let message = $("#user-text");
let socket = io();


function addRowToChatBox(user, text, color="blue") {
    chatBox.append(`
        <div class="flex flex-row">
            <span style='color: ${color}'>${user}: ${text}</span>
        </div>
    `)
}

function addNotification(text) {
    chatBox.append(text);
}

function sendMessage(text) {
    socket.emit('message', {        
        message: text
    });
}

function cleanChatBox() {
    chatBox.empty();
}

btnSendMessage.click(() => {
    let messageToSend = message.val();    
    addRowToChatBox("Me", messageToSend);
    sendMessage(messageToSend);
});


// Socket.io handling methods

socket.on('user is disconnected', () => {
    location.href = "/users";
});

socket.on('new message', (data) => {
    const {username, message} = data;
    const color = "red"
    addRowToChatBox(username, message, color);
});

socket.on('old messages', (messages) => {
    for (msg of messages) {
        addRowToChatBox(msg.username, msg.message);
    }
});

socket.on('user connected', (text) => {
    addNotification(text);
});

socket.on('user disconnected', (text) => {
    addNotification(text);
});