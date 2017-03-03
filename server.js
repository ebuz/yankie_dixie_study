const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./build'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});


const server = require('http').createServer(app);
// var io = require('socket.io')(server);
// var p2pserver = require('socket.io-p2p-server').Server;

// io.use(p2pserver);
// io.on('connection', (socket) => {
//     console.log('new connection from ' + socket.id);
//     socket.on('server-msg', (data) => {
//         console.log('got message for just the server');
//     });
// });

const serverPort = 3000;
server.listen(serverPort, () => {
    console.log('servering on ' + serverPort);
});
