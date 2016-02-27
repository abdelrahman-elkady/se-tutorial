var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    db.db().collection('post').find().toArray(function(err, posts) {
        if (err) return next(err);
        res.render('index', {posts: posts});
    });
});

module.exports = router;
