/**
 * I used jQuery for simplicity and for some helper methods of the library.
 */

let chatBox = $("#chat-box");
let btnSendMessage = $("#send-message");
let user = $("#username");
let message = $("#user-text");
let socket = io();


function addRowToChatBox(user, text) {
    chatBox.append(`
        <div class="flex flex-row">
            <span>${user}: ${text}</span>
        </div>
    `)
}

function sendMessage(user, text) {
    socket.emit('message', {
        username: user,
        message: text
    });
}

function cleanChatBox() {
    chatBox.empty();
}

btnSendMessage.click(() => {
    let messageToSend = message.val();
    let username = user.val();
    addRowToChatBox("Me", messageToSend);
    sendMessage(username, messageToSend);
});


// Socket.io handling methods

socket.on('new message', (data) => {
    const {username, message} = data;
    addRowToChatBox(username, message);
});
