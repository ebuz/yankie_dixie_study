const fs = require('fs');
const path = require('path');
const express = require('express');
const multer  = require('multer');
const bodyParser  = require('body-parser');
const mkdirp = require('mkdirp');

let app = express();
let server = require('http').createServer(app);

let p2pserver = require('socket.io-p2p-server').Server;
let io = require('socket.io')(server);

io.use(p2pserver);

io.on('connection', (socket) => {
    console.log('new connection from ' + socket.id);
    socket.on('server-msg', (data) => {
        console.log('got message for just the server');
    });
});

app.use('/recordings', express.static(path.join(__dirname, 'recordings')));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));

app.use(express.static(__dirname + '/build'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const recordingFilter = (req, file, cb) => {
    // accept audio only
    if (!file.originalname.match(/\.(ogg|webm)$/)) {
        return cb(new Error('Only audio files are allowed!'), false);
    }
    cb(null, true);
};
const profileFilter = (req, file, cb) => {
    // accept image or audio only
    if (!file.originalname.match(/\.(png|ogg|webm)$/)) {
        return cb(new Error('Only image or audio files are allowed!'), false);
    }
    cb(null, true);
};

const recordingDestination = './recordings/';
const profileDestination = './profiles/';
const assignmentDestination = './assignments/';

const recordingStorage = multer.diskStorage({
    destination: recordingDestination,
    filename: function (req, file, cb) {
        mkdirp(path.join(recordingDestination, req.params.speakerid),
            err => cb(err, `${req.params.speakerid}/${file.originalname}`));
    }
})
const profileStorage = multer.diskStorage({
    destination: profileDestination,
    filename: function (req, file, cb) {
        cb(null, `${req.params.speakerid}${path.extname(file.originalname)}`);
    }
})
const assignmentStorage = multer.diskStorage({
    destination: assignmentDestination,
    filename: function (req, file, cb) {
        cb(null, `${req.body.assignmentId}.json`);
    }
})

const recordingUpload = multer({
    storage: recordingStorage,
    fileFilter: recordingFilter,
});

const profileUpload = multer({
    storage: profileStorage,
    fileFilter: profileFilter,
});
const assignmentUpload = multer({
    storage: assignmentStorage,
    fileFilter: profileFilter,
});

app.post('/recording/:speakerid', recordingUpload.single('recording'),
    function(req, res, next) {
        console.log(`got recording ${req.file.originalname} from ${req.params.speakerid}`)
        res.sendStatus(200)
    });

app.post('/profile/:speakerid',
    profileUpload.fields([{ name: 'profileImage', maxCount: 1 },
        { name: 'profileMessage', maxCount: 1 }]),
    function(req, res, next) {
        console.log(`got part profile for ${req.params.speakerid}`)
        res.sendStatus(200)
    });

const urlencodedParser = bodyParser.urlencoded({ extended: true })

const saveAssignment = (req, res) => {
    if (!req.body) {
        console.log(`req has no body, sending 400`)
        return res.sendStatus(400)
    }
    if (!req.body.assignmentId || !req.body.data) {
        console.log('no assignmentId or no data, sending 400')
        return res.sendStatus(400)
    }
    console.log('saving assignment')
    fs.writeFile(
        path.join(assignmentDestination, `${req.body.assignmentId}.json`),
        req.body.data, (err) => {
            if (err) {
                console.log('problem with saving file, sending 500')
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
};

app.post('/submitassignment',
    (req, res, next) => {
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            next() //pass request onto bodyParser
        } else {
            next('route') //pass request onto multer
        }
    }, urlencodedParser, saveAssignment);

app.post('/submitassignment', assignmentUpload.none(), saveAssignment);

const serverPort = 8080;
server.listen(serverPort, () => {
    console.log('listening on port ' + serverPort)
});
