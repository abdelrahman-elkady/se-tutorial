var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static('static'));

app.use(require('./routes/posts'));

module.exports = app;
