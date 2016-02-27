var express = require('express');
var app = express();
var db = require('./db.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');

app.use(require('./routes/index'));
app.use(require('./routes/posts'));

app.use(express.static('static'));

module.exports = app;
