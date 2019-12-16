var cmd = require('node-cmd');
const express = require('express');
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
var cors = require('cors');
var exec = require('sync-exec');
const app = express();
const port = 7001;
var ipArray = ['192.168.1.20', '192.168.1.23'];
app.use(cors());
app.options('*', cors());
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
/*function ip() {
    var arr = [];
    for (var i = 0; i < ipArray.length; i++) {
        cmd.get(
            'iperf3 -c ' + ipArray[i] + ' -t 1',
            function (err, data, stderr) {
                var naz = data.toString().indexOf("Mbits") - 7;
                var gurol = naz + 7;
                var a = data.substring(naz, gurol).replace(/ /g, "");
                var b = parseFloat(a);
                arr.push({
                    ip: ipArray[i],
                    bandwidth: b
                });
            }
        );
    };
    return arr;
}*/
app.get('/public/*', function (req, res) {
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
app.get('/getMaxBandwidth', function (req, res) {
    var arr = [];
    //var data = exec('iperf3 -c ' + '192.168.1.20' + ' -t 1');
    for (var i = 0; i < ipArray.length; i++) {
        var data = exec('iperf3 -c ' + ipArray[i] + ' -t 1');
        var naz = data.stdout.toString().indexOf("Mbits") - 7;
        var abc = naz + 7;
        var a = data.stdout.toString().substring(naz, abc).replace(/ /g, "");
        var b = parseFloat(a);
        arr.push({
            ip: ipArray[i],
            bandwidth: b
        });
    }
    var temp = 0;
    var obj = null;
    for (var j = 0; j < arr.length; j++) {
        if (arr[j].bandwidth >= temp) {
            temp = arr[j].bandwidth;
            obj = arr[j];
        }
    }
    res.send(obj);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));