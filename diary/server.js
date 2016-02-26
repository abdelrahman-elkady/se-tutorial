var app = require('./app.js');
var db = require('./db.js');

db.connect(function(err) {
    console.log('connected to db');
    db.seed(function () {
        console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    });
});