const io = require('./../server');

exports.socket = (req, res, next) => {
    const io = req.io;
    console.log("In socket controller", io);
    io.on('connection', onConnected);
}

function onConnected(socket) {
  console.log("User", socket.id, "connected")
}