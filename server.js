const app = require("./app");

const server = app.listen(3000, () => {
  console.log("App is listening on port 3000");
});


const connectedClients = [];

const io = require('socket.io')(server);

io.on('connection', onConnected);

function onConnected (socket) {
  console.log(`User: ${socket.id} connected`)

  connectedClients.push(socket.id);
  io.emit('clients-total', connectedClients.length);

  console.log("Total connected clients:", connectedClients.length)
  
  
  socket.on('disconnect', () => {
    console.log(`User: ${socket.id} disconnected`);
    connectedClients.splice(connectedClients.indexOf(socket.id), 1)
    io.emit('clients-total', connectedClients.length);   
    console.log("Total connected clients:", connectedClients.length)
  })

  socket.on('message', (data) => {
    console.log(`Message recieved from ${data.name}: ${data.message}`)

    socket.broadcast.emit('chat-message', data);
  })

  
}
