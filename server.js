var http = require('http');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var DB;
mongo.connect('mongodb://localhost:27017/app', function (err, db) {
    console.log('connected to db');
    DB = db;
});

var handleRequest = function handleRequest(request, response){
    if (request.url==='/index.html') {
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./index.html'));
    } else if(request.url==='/posts') {
        response.writeHeader(200, {'Content-type':'application/json'});
        DB.collection('posts').find().toArray(function (err, users) {
            if (err) throw err;
            response.end(JSON.stringify(users));
        });
    } else {
        response.writeHeader(404);
        response.end('404 Nothing to see here: ' + request.url);
    }
};
var server = http.createServer(handleRequest);
var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});