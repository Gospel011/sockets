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
    if(messageInput.value === '') return;
    console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        date: new Date()
    }

    socket.emit('message', data);
    addMessageToUI(true, data);
    messageInput.value = '';
}

function addMessageToUI(isOwnMessage, data) {
    const messageElement = `<li class=${isOwnMessage ? "message-right" : "message-left" }>
    <p class="message">
      ${data.message}
    </p>
    <span>${data.name} &#x2022 ${moment(data.date).fromNow()}</span>
  </li>`;

  messageContainer.innerHTML += messageElement;

  scrollToBottom();
  
  console.log(messageContainer.innerHTML);
}

function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total clients: ${data}`;
})


// Event when message is recieved from server
socket.on('chat-message', (data) => {
    console.log("Recieved", data)
    addMessageToUI(false, data);
})