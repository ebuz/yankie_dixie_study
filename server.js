var path = require('path');
var express = require('express');
var multer  = require('multer');
const mkdirp = require('mkdirp')

var app = express();
var server = require('http').createServer(app);

var p2pserver = require('socket.io-p2p-server').Server;
var io = require('socket.io')(server);

io.use(p2pserver);

io.on('connection', (socket) => {
    console.log('new connection from ' + socket.id);
    socket.on('server-msg', (data) => {
        console.log('got message for just the server');
    });
});

app.use(express.static(__dirname + '/build'));

app.use('/recordings', express.static(path.join(__dirname, 'recordings')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const audioFilter = (req, file, cb) => {
    // accept audio only
    if (!file.originalname.match(/\.(wav|ogg|webm)$/)) {
        return cb(new Error('Only audio files are allowed!'), false);
    }
    cb(null, true);
};

const recording_destination = './recordings/';

const storage = multer.diskStorage({
    destination: recording_destination,
    filename: function (req, file, cb) {
        mkdirp(path.join(recording_destination, req.params.speakerid),
            err => cb(err, `${req.params.speakerid}/${file.originalname}`));
    }
})

var recording = multer({
    storage: storage,
    fileFilter: audioFilter,
});

app.post('/recording/:speakerid', recording.single('recording'), function(req, res, next) {
    console.log(`got file ${req.file.originalname} from ${req.params.speakerid}`)
    res.sendStatus(200)
});

const serverPort = 8080;
server.listen(serverPort, () => {
    console.log('listening on port ' + serverPort)
});
