# Lab 2

## Objective

- Learn how to use mongodb.
- Learn how to use nodejs.
- setup a basic server
- have it serve our indec.html page
- have our server serve JSON from our database.

## Requires

- Internet
- Google chrome
- A plain text editor (preferably sublime)
- mongodb
- nodejs

## Pre

- Once again you can help us help you get started prior to joining the lab by completing the following [interactive mongodb tutorial](http://mongly.openmymind.net/tutorial/index)
- You can also learn quite a bit from the first week in the [edx course](https://www.edx.org/course/introduction-mongodb-using-mean-stack-mongodbx-m101x)
- Read [this articel on javascript](mdn-re-intro-to-js) to get familiar with the syntax.

## Tutroial Guide

At this point you should have a unix system if not you can follow along on [c9.io](c9.io)
    - create a curom instance
    - [install mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
    - run mongod and create a new terminal window to follow along

### Mongodb

Mnogodb is a NoSQL, Schemaless, document based database, it uses javascript syntax which makes it very convinient for the course, its syntax is also very simple

You can skim through this section if you already completed this [interactive mongodb tutorial](http://mongly.openmymind.net/tutorial/index) (30 min)
However you still need to run the commands so that you have an identical db.

#### Start mongod

> Mac users don't have mongodb running as a service by default and need to run mongod in a local folder ubuntu users will not need to do this step

Create a data folder to host your mongodb database

```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
$ mkdir data
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
$ mongod --dbpath ./data
```

This will start the mongodb database on port 27017

In ubuntu after installation mongodb is registered as a service and an init.d file is added to your start scripts which starts mongodb in the background autimatically

From here just open a new tab and leave the mongodb instance running `cmd+t` in your terminal, when you close the tab running the database the datase will stop working.

#### Connect to mongodb shell

We can open the mongodb shell by typing `mongo` in the terminal

You shold get something that looks kinda like this minus some warnings

> the $ and > is an indication the start of a command line and is not part of the command.

```
$ mongo
MongoDB shell version: 3.2.0
connecting to: test
> 
```


> Note: that right now you are in a shell mode commmands like `cd` and `ls` won't work.

> If you get an error and you are an ubuntu user run `service mongodb start` mac users see previous section. For furthur issues consolt TA.

#### Using databases

By default when you open the console you will connect to a test database though if you don't use it it won't show

The mongodb documentation library is pretty good and you would generally get it as the first result when googleing for how to do stuff.

To see the databases in your current running mongdb instance type `show dbs`

```
> show dbs
dev    0.527GB
tests  0.000GB
local       0.000GB
>
```

If this is your first time running the database you should only see local

To use a database we type `use name` where name is the name of the database.

Let's create a database called _app_ cause we're very creative with our names. :smirk:

```
> use app
switched to db app
>
```

Mongodb will switch to app if it already exists and if it doesn't it will create it.

Now try `show dbs` you should see app.

From here on out we will refer to the currently active database as `db`.
Creativity just flows in engineers :stuck_out_tongue_closed_eyes:.

#### Insert a collection

Mongodb uses collections to keep track of documents, this is analogous to SQL databases that use tables to keep track or records.

to see the collections we have in our database we type `show collections`

```
> show collections
>
```

At this point we will see nothing, you can guess why I'm sure :sweat_smile:

So let's add something.

For fun we decided to create a reddit, facebook, stackoverfllow, hibrid.

So the first thing we need to do is define one of the most common feature among all these systems a _post_. 

To insert a document into the database we type

```js
db.collection_name.insert({key:value, ...})
```

`db` referes to the currently active database.

`collection_name` is the name of the collection we want to refer to, mongodb will autimatically use it if it exists and create a new collection if it doesn't exist.

`insert()` is a function that takes as a parameter an JSON object.

Google mongodb for more mongdb functions.

> A JSON object in case you didn't know stands for [JavaScript Object Notation](http://www.w3schools.com/json/)

So let's insert a trivial post

```js
> db.posts.insert({title:"I love cats", likes:9001, comments: ["cats are awesome!!", "OMG they are"]}) 
WriteResult({ "nInserted" : 1 })
>
```

So now lets check and see our collections

```
> show collections
posts
>
```

#### Insert Many

ok this looks good.

So now let's add a bit more this time we will use `insertMany()` which takes an array of JSON objects

```js
> db.posts.insertMany([{title:"I hate Cats", likes:-999999999},{title:"Cats suck", likes: "The internet says you suck"}])
```

You should see

```js
> db.posts.insertMany([{title:"I hate Cats", likes:-999999999},{title:"Cats suck", likes: "The internet says you suck"}])
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("56bd768c234604ab36eb15b3"),
        ObjectId("56bd768c234604ab36eb15b4")
    ]
}
>
```

> Note how we simply didn't include comments in both records and even wrote likes as a string in the second entry, this is because as we mentioned in mongodb documents are schemaless.

#### Find

ok so now that we have some records, we can try to get them, to do that we use the `find()` function.

```js
> db.posts.find()
```

You should get

```js
> db.posts.find()
{ "_id" : ObjectId("56bd7596234604ab36eb15b2"), "title" : "I love cats", "likes" : 9001, "comments" : [ "cats are awesome!!", "OMG they are" ] }
{ "_id" : ObjectId("56bd768c234604ab36eb15b3"), "title" : "I hate Cats", "likes" : -999999999 }
{ "_id" : ObjectId("56bd768c234604ab36eb15b4"), "title" : "Cats suck", "likes" : "The internet says you suck" }
> 
```

We can filter by adding a JSON object as parameter

```js
> db.posts.find({likes: {$gt: 9000}})
{ "_id" : ObjectId("56bd7596234604ab36eb15b2"), "title" : "I love cats", "likes" : 9001, "comments" : [ "cats are awesome!!", "OMG they are" ] }
> 
```

for more on the syntax see [mongodb](https://docs.mongodb.org/v3.0/reference/method/db.collection.find/)

#### Exit Mongo

To exit the mongo shell type `Ctrl+C` (both mac and linux) which will allow you to exit the shell.

> `Ctrl+C` generally allows you to terminate any runing process in the terminal and can be used to cancel a command.

> Note some shells like python you exist with `Ctrl+Z`, `Ctrl+D`, or `Ctrl+X`.


### NodeJS

Node JS is a javascript runtime engine which allows you to run Javascript outside the browser.
In its core it uses V8 which is the chrome browser Javacript Engine.

Before starting a NodeJS server we'll go over some ideas you should be familiar with.

you can check that you have the node version used by this course by typing

```
$ node -v
```

> If you get an error or nothing then you may not have node properly set up or installed refer to the installation guide in the README.md

#### Node REPL/Shell/Console

We can start the node REPL by just typing node

```
$ node
>
```

In this mode you can type javascript and it will get autimatically executed, eg:

```js
> 1 + 2
3
> Math.floor(1.5)
1
> var person = {}
undefined
> person
{}
> person.name = "Amr Draz"
"Amr Draz"
> person
{ name: "Amr Draz" }
> person.name
"Amr Draz"
> person["name"]
"Amr Draz"
>
```

For more on javascript checkout the article in the [pre tutorial section](mdn-re-intro-to-js)

To exist the REPL just type `Ctrl+C` 2 times

> Note that variables you declare and changes you do are not persisted across REPL sessions

#### Running a Javascript File

Let's start typing some javascript that we can reuse.
In our current folder create a file called test.js

```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
$ subl test.js
```

In our editor type

```js
console.log("Hello World");
```

and save.

We can see that the file was saved in our terminal window with `ls`

```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
$ ls
README.md    data         lab-2.md     
app          lab-1.md     test.js
```

To run our code, we call node on the file with the following command.

```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
$ node test.js
Hello World
```


#### Javascript Callback Functions

Some facts about JavaScript (JS)

- JS is not typed so all we need to declare a variable is to type var.
- Everything in JS is composed of Objects including functions.

we can therefor store functions in variables as well as pass them and return them.

so add to your test.js file a function that does what console.log does and call it print.

To declare a function in JavaScript we write

```js
function name (argument) {
    // ... do stuff
    return; // or not
}
```

another way of defining a function is the function expression (like arethmatic expression)

```js
var a = 1;
```
Is called an arethmatic expression where a is now a variable pointing towards the number 1 in memory;

similarly

```js
// we are in test.js
var log = function (word) {
    console.log(word)
}
```
Is called a functional expression.

Now `log` is a variable that references the function we created

```js
// we are in test.js
console.log(log)
// prints [Function] inticating it's a Function Object
```

We can call it by using `()`.

> Note that javascript doesn't know before runtime what value the variable holds so it will only know when it tries to execute.

```js
// we are in test.js
var a = 10;
log(a) // prints 10
```

and just like you can pass a variable holding a number to function as argument.
You can pass a variable that holds a reference of a function to another function as argument

```js
// all of test.js

var a = 10;
var log = function (word) {
    console.log(word);
}

var call = function(a, callback) {
    callback(a);
}

call(a, log);
```

And this is all what a callback function is.

We will talk more about functional programing in JavaScript latter and how powerful it is but now we move on to another important concept.

> You Do: create a function called constant that takes one argument and returns a __function__ that returns what you originally passed.

#### Modules

In Java you may be used to importing classes from other files via the `import` statement.

Javascript -- prior to version 6 (ES6) -- didn't have an `import` statement. so in node we use a function call `require()` which imports the file.

Note that by default all variables declared in your module ie. js file are private.
So you have to explicitly export them.

With that in mind we rewrite our test.js to look like this.

```js
// all of test.js

var a = 10;
var log = function (word) {
    console.log(word);
}

var call = function(a, callback) {
    callback(a);
}

exports.call = call;
exports.print = log;
exports.a = a;
```

We can then use it in other files by calling require

```js
// test2.js

var test = require('./test.js');

test.print(test.a)

var b = test.a;

test.call(b, test.print)
```

Now if you run this file in the terminal

```js
$ node test2.js
10
```

We get the same functionality and we can reuse test anyware we want like good programers :bowtie:

#### Node Basic Server

Create a file called server.js a write the following code

```js
// server.js

var http = require('http');

var handleRequest = function handleRequest(request, response){
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end('Bettala3 Omash!! served form url: ' + request.url);
}
var server = http.createServer(handleRequest);
var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

```

By now you should have an idea how the file is executed.
We can run the server like any other file.

```js
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
$ node server.js 
Server listening on: http://localhost:8080

```

You can now visit [localhost:8080](http://localhost:8080) and you will see your response.

> You Do: Have the server log and count everytime a user visites your site.

#### Node Serve index.html

In node we can read a file using the node `fs` module, this 

```js
// server.js

var http = require('http');
var fs = require('fs');

var handleRequest = function handleRequest(request, response){
        if (request.url==='/index.html') {
            response.writeHeader(200, {'Content-type':'text/html'});
            fs.readFile('./app/index.html', function (err, file) {
                if (err) throw err;
                response.end(file);
            });
        } else {
            response.writeHeader(404);
            response.end('404 Nothing to see here: ' + request.url);
        }
}
var server = http.createServer(handleRequest);
var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

```

> You Do: setup a creative 404 page and serve it instead of the message I wrote

> You Do: Make it so that `/` also serves index.html

#### Node Serve JSON from the database

We can start building what we will later call an API endpoint for posts

We will add a url `/posts` that serves all posts in the database.


```js
// server.js
// ...beffor handle request
var handleRequest = function handleRequest(request, response){
        //.. index if condition
        } else if (request.url==='/posts') {
            // handle quiring the database
        } //.. 404 if condition
}
// ...rest of server code
```

##### npm install

In order to connect to mongodb we will need to install the official mongodb node package.

To do that simply run

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ npm install mongodb

This should download and add the mongodb package to a local node_modules folder

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ ls
    README.md    data         node_modules  test.js
    app          lab-1.md     lab-2.md     

> documentation on how to use any node package is useually found on the repository page or website. You're lookig for something like API, Docs, Reference, Guide, Getting started or the README.md on the repo.

For more on how to use the mongodb package see [its online documentation](http://mongodb.github.io/node-mongodb-native/2.1/)

You should windup with code that looks something like this

```js

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
        })
    } else {
        response.writeHeader(404);
        response.end('404 Nothing to see here: ' + request.url);
    }
}
var server = http.createServer(handleRequest);
var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

```

JSON.strigify converts arrays and objects into strings (response.end take only a string or a file stream).

This line
```
mongo.connect('mongodb://localhost:27017/app', ...
```

As previously mentioned the database by default will run on port 27017 and we want to use the app database, hence the url.

You can now stop the node server in the termainl with `Ctrl+C` and restart it with `node server.js`


## Post Tutorial

After completing this tutorial you have enough knowledge to try working with tutorials that are npm based

[learn more about functional programing](https://github.com/timoxley/functional-javascript-workshop)
[learn about design patterns](http://www.dofactory.com/javascript/design-patterns)
[more on design patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)





[mdn-re-intro-to-js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript