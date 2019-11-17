const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://knazkurt:B8VpSeXxtkhrkA4t@cluster-3gt81.mongodb.net/test?retryWrites=true&w=majority";

const app = express(); // Initialize the express web server
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
            res.redirect('back');
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
            res.send(result[0]);
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

const server = app.listen(7000, function () {
    console.log(`Listening on port ${server.address().port}`);
});