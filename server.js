const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./build'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

var serverPort = 3000;

app.listen(serverPort, () => {
    console.log('servering on ' + serverPort);
});
