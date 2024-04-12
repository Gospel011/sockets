const socketController = require('./../controllers/socket_controller');
const express = require('express')
const router = express.Router();

router.get('/socket', socketController.socket);

module.exports = router;