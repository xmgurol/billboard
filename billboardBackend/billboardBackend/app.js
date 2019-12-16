const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var url = "mongodb+srv://knazkurt:B8VpSeXxtkhrkA4t@cluster-3gt81.mongodb.net/test?retryWrites=true&w=majority";

const app = express(); // Initialize the express web server

app.use(bodyParser.json());

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7000); // server is deployed on port 7000

app.use(cors());
app.options('*', cors());

app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware

const uploadPath = path.join(__dirname, 'public'); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

/**
 * Create route /upload which handles the post request
 */

io.on('connection', function(socket) {
    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });
});

app.get('/public/*', function(req, res) {
    var truePath = req.path.split('/')[2];
    var file = path.join(uploadPath, truePath);
    if (file.indexOf(uploadPath + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.route('/upload').post((req, res) => {
    req.pipe(req.busboy); // Pipe it trough busboy

    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.send('Successfully Uploaded.');
        });
    });
});

app.route('/getFiles').get((req, res) => {
    var files = [];
    fs.readdirSync(uploadPath).forEach(file => {
        files.push(file);
    });
    res.send(files);
});

app.route('/screen').get((req, res) => {
    var screenName = req.query.name;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("nazBitirme");
        var query = { ScreenName: screenName };
        dbo.collection("Screens").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.route('/screen').put((req, res) => {
    console.log(req.body);
    var screenName = "Atasehir";
    var body = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("nazBitirme");
        var query = { ScreenName: screenName };
        var newvalues = { $set: { 
            Orientation: body.Orientation,
            Layout: body.Layout,
            FileA: body.FileA,
            FileB: body.FileB,
            FileC: body.FileC
        } };
        dbo.collection("Screens").updateOne(query, newvalues, function (err, result) {
            if (err) throw err;
            res.send("1 document updated");
            var sendBody =
            {
                Orientation: body.Orientation,
                Layout: body.Layout,
                FileA: body.FileA,
                FileB: body.FileB,
                FileC: body.FileC
            };
            io.sockets.emit("changePictureOnScreen", sendBody);
            db.close();
        });
    });
});

app.route('/login').get((req,res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
    console.log(login);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("nazBitirme");
        var query = { username: login, password: password };
        dbo.collection("Users").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.route('/register').get((req,res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
    console.log(login);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("nazBitirme");
        var query = { username: login };
        dbo.collection("Users").find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) res.send("User already exists.");
            else
            dbo.collection("Users").insertOne(query, function(err, response) {
                if (err) throw err;
                res.send("1 user inserted");
                db.close();
            });
            db.close();
        });
    });
});

app.get('/video', function (req, res) {
    const path = 'public/a.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});

