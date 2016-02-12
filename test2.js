
var test = require('./test.js');

test.print(test.a);

var b = test.a;

test.call(b, test.print);