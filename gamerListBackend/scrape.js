var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var port = 3000;
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
//here is the magic
app.use(cors({ origin: true, credentials: true }));

igdb = require('igdb-api-node')
global.mashapeKey = 'OldMashapeKeyHere'

// igdb.games({ limit: 5, offset: 15, fields: "*" }).then(function(output){
//     console.log(output)
// });
var originsWhitelist = [
    'http://localhost:8100' //this is my front-end url for development
];

app.get('/games', function (req, res) {

})

app.post('/games', function (req, res) {

    igdb.games({
        search: req.body.data,
        fields: "*"
    }).then(function (output) {
        res.json(output)

    });

})

app.listen(port, function () {
    console.log('app is running...');
    console.log(global.mashapeKey);
    console.log()
});
