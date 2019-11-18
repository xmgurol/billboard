const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://knazkurt:B8VpSeXxtkhrkA4t@cluster-3gt81.mongodb.net/test?retryWrites=true&w=majority";

const app = express(); // Initialize the express web server

app.use(cors());
app.options('*', cors());

app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware

const uploadPath = path.join(__dirname, 'fu/'); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits

/**
 * Create route /upload which handles the post request
 */

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
    var fileType = req.query.fileType;
    var files = [];
    fs.readdirSync(uploadPath).forEach(file => {
        var fileNameSplitted = file.toString().split('.');
        if ((fileType === 'text' && fileNameSplitted[fileNameSplitted.length - 1] === 'txt') ||
            (fileType === 'image' &&
                (fileNameSplitted[fileNameSplitted.length - 1] === 'png' ||
                    fileNameSplitted[fileNameSplitted.length - 1] === 'jpg' ||
                    fileNameSplitted[fileNameSplitted.length - 1] === 'jpeg' ||
                    fileNameSplitted[fileNameSplitted.length - 1] === 'gif'))) {
            files.push(file);
        }
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
    var screenName = req.query.name;
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
            FileC: body.FileC,
        } };
        dbo.collection("customers").updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            res.send("1 document updated");
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

const server = app.listen(7000, function () {
    console.log(`Listening on port ${server.address().port}`);
});