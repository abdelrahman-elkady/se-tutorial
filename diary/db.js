var assert = require('assert');
var mongodb = require('mongodb').MongoClient;

var _db = null;
var dbUrl = 'mongodb://localhost:27017/diary_db';
var posts = [{
    title: 'This the first post',
    content: 'First post'
}, {
    title: 'This a second post',
    content: 'second post has more insight into the human spirit'
}];

var DB = {
    seed: function seed(cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('post').insertMany(posts, function(err, result) {
                assert.equal(null, err);
                assert.equal(2, result.result.n);
                cb(err);
            });
        });
    },
    connect: function connect(cb) {
        mongodb.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            _db = db;
            cb(err, db);
        });
    },
    db: function db() {
        assert.notEqual(null, _db);
        return _db;
    },
    clear: function clear(done) {
        _db.listCollections().toArray().then(function(collections) {
            collections.forEach(function(c) {
                _db.collection(c.name).removeMany();
            });
            done();
        }).catch(done);
    }
};
module.exports = DB;
