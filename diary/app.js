var express = require('express');
var app = express();

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});