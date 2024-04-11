const socket = io();

const clientsTotal = document.getElementById('clients-total')

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        date: new Date()
    }

    socket.emit('message', data);
}

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total clients: ${data}`;
})

socket.on('chat-message', (data) => {
    console.log("Recieved", data)
})