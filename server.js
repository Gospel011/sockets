const app = require("./app");

const server = app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

const socketRouter = require('./routes/sockets_route');


const io = require('socket.io')(server);

// app.use('/', (req, res, next) => {
//   req.io = io;
//   next();
// }, socketRouter);

const connectedClients = [];


io.on('connection', onConnected);

const chatNsp = io.of('/chat');

chatNsp.on('connection', onChatConnected)

function onChatConnected(socket) {
  console.log("User", socket.id, "connected to the chat namespace");
  
  socket.on('disconnect', ()=> {
    console.log("User", socket.id, "disconnected from the chat namespace");
    
  })
}


function onConnected (socket) {
  connectedClients.push(socket.id);
  console.log(`User: ${socket.id} connected`, connectedClients);
  

  
  socket.on('disconnect', () => {
    connectedClients.splice(connectedClients.indexOf(socket.id), 1);
    console.log(`User: ${socket.id} disconnected`, connectedClients);   
    
  })

  socket.on('typing', (data) => {
    console.log("Typing data:", data);
    socket.broadcast.emit('typing', data);
  })
  
  socket.on('new chat', (chat) => {
    

    console.log("new chat recieved", chat);

    socket.broadcast.emit('new message', chat);
  })

  
}

// function onConnected (socket) {
//   console.log(`User: ${socket.id} connected`)

//   connectedClients.push(socket.id);
//   io.emit('clients-total', connectedClients.length);

//   console.log("Total connected clients:", connectedClients.length)
  
  
//   socket.on('disconnect', () => {
//     console.log(`User: ${socket.id} disconnected`);
//     connectedClients.splice(connectedClients.indexOf(socket.id), 1)
//     io.emit('clients-total', connectedClients.length);   
//     console.log("Total connected clients:", connectedClients.length)
//   })

//   socket.on('message', (data) => {
//     console.log(`Message recieved from ${data.name}: ${data.message}`)

//     socket.broadcast.emit('chat-message', data);
//   })

  
// }
