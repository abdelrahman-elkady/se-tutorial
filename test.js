
var a = 10;
var log = function (word) {
    console.log(word);
};

var call = function(a, callback) {
    callback(a);
};

exports.call = call;
exports.print = log;
exports.a = a;