var assert = require('assert');
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var app = express();

var DB = null;

mongodb.connect('mongodb://localhost:27017/diary_db', function(err, db) {
    if (err) throw err;
    DB = db;
    var post = {
        "header": "Title added with JavaScript From DB",
        "body": "This post's body text was populated by sending a get request to /api/post"
    };
    // http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#updateOne
    db.collection('post').updateOne(post, post, {
        upsert: true,
        w: 1
    }, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result.result.n);
        console.log('Db Connected and one post inserted');
    });
});

app.use(express.static('static'));

app.get('/api/post', function(req, res, next) {
    DB.collection('post').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

