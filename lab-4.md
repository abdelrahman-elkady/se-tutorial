# Lab 4 - updated

## Tutorial Expected Objective

We will create a diary app for you to keep track of ~~your sanity before this course drives you into madness~~ your great SE experience so that your children may hear of your great conquest ~~and honer th sous of our fallen comrades~~.

While working on the app we will demonstrate a good git work flow.

By the end of the lab you should have acquired.

- An understanding of (node package manager) npm
    - node module syntax (require/export)
    - npm install
- Create package.json
    - read package.json
    - npm install from package and adding dependency
    - npm test
    - npm run [script]
- Build a simple express app
- Serve static files
    - load some javascript and some css as separate files
- Update our interface with jQuery
- Update our interface data from a json file
- Build a simple API
- Query The API with jQuery and update our page

## Requires

- Internet
- Google chrome
- A plain text editor (preferably sublime)
- mongodb
- nodejs
- git
- npm packges mocha, chai, supertest istanbul

## Pre

- If you haven't yet fill this [form][student-form] while creating a github account

## Pre-requisite

- Lab 2 is a prerequisite to redo it assuming you cloned the se-tutorial repo

```
$ git checkout lab-2-start
```

## Tutorial Guide

To follow along this tutorial just

```
$ git checkout lab-4-start
```


### What is npm

The nodeJS eco-system has an abundance of packages that make carrying this forward easier and they are all stored on [npm][npm].

npm allows developers to share code across projects we bundle this code in modules that we call packages.

To learn more about npm see their [getting started guide][npm]. most notably there's a short npm install [locally][npm-install] and [globally][npm-install-g], more on install syntax [here][npm-install-more].

### Package.json

All package related information about our app is note din package.json

Since the package philosophy is based on making every package as small and reusable as possible, npm packages often have other packages __dependencies__.

For more on this see [this section][npm-packages] of the npm getting started guide.

### Starting our project

There are many ways to start a project, there are many project generators that you can use similar that will create some files as your starting point.

In the previous version of this lab we had an [external tutorial][express-rest] on building a restful app that used the express generator.

We will also use a generator later on in the future but for now we will walk you though creating your project manually.

Create a folder for our project (diary for example) and `cd` into it

```
$ mkdir sanity-diary && cd sanity-diary
```

open sublime inside this folder

```
$ subl .
```

Create a minimal package.json file as described [here][npm-packages] either through the command or by writing it yourself.

You should wind up with something that looks like this

```json
{
  "name": "diary",
  "version": "0.0.1",
  "author": "Amr Draz <amr.m.draz@gmail.com>"
}
```

### Basic express server

#### Basic server
If you remember in lab-2 we constructed a basic node server

```js
// server.js
var http = require('http');

var handleRequest = function handleRequest(request, response){
        response.writeHeader(200, {'Content-type':'text/plain'});
        response.end('Server is working you visited: ' + request.url);
    }
}
var server = http.createServer(handleRequest);

var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
```

And when we want to serve html files, we would do something like this

```js
// server.js

var http = require('http');
var fs = require('fs');

var handleRequest = function handleRequest(request, response){
    if (request.url==='/index.html') {
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./app/index.html'));
    } else {
        response.writeHeader(404, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./app/404.html'));
    }
};
var server = http.createServer(handleRequest);

var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
```

However as the node community recognizes this would've evidently not scale very well.

#### install express

[ExpressJS][express] is a simple micro-framework that is highly expendable.

We will be using it in our project so we will add it as a dependency.

If you understand that express is a package and how npm install works you should be able to pick the correct command form the [express install guide][express-install]. You will need the Internet at this point.

When you're done your package.json should look like this (at the time of writing this tutorial).

```json
{
  "name": "diary",
  "version": "0.0.1",
  "author": "Amr Draz <amr.m.draz@gmail.com>",
  "dependencies": {
    "express": "^4.13.4"
  }
}
```

and your app folder should look like this

```
 /Users/draz/se-project/se-tutorial/diary
|-- node_modules
`-- package.json
```

#### app.js

Now write a [hello world express  app][express-hello] and run it to try it out.

If you follow along you should be capable of testing it at [http://localhost:3000](htttp://localhost:3000).

You should now have a directory structure that looks like this

```
 /Users/draz/se-project/se-tutorial/diary
|-- app.js
|-- node_modules
`-- package.json
```

#### npm start

It is always best to abstract away unneeded development details from other people.

Now we could type `node app.js` every time we want to start the app, but what if we decide to do things differently later on like use nodemon instead of node or other start commands.

Better to setup a [facade](https://sourcemaking.com/design_patterns/facade) in front of the app starting logic.

We will add a start script to our package.json in order to unify our app start command (also the command may become longer later).

Your package.json should now look something like this.

```json
{
    "name": "diary",
    "version": "0.0.1",
    "author": "Amr Draz <amr.m.draz@gmail.com>",
    "scripts": {
        "start": "node app.js"
    },
    "dependencies": {
        "express": "^4.13.4"
    }
}
```

and now we can start the app with

```
$ npm start
```

You can learn more about express from their website [guide](http://expressjs.com/en/guide/routing.html) and [api refrence](http://expressjs.com/en/4x/api.html) when you need too.

## Express Serving a file

In lab-1 we created a simple google.com page and in it we wrote all our html in addition to the css code.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Google</title>
    <style>
        body {
            text-align: center;
            font-family: Arial;
        }
        .search {
            width: 400px;
        }
    </style>
</head>
<body>
    <h1>Google</h1>
    <form action="http://www.google.com" method="get">
        <input class='search' type="text" placeholder="Search" name="q">
        <div>
            <input type="submit" value="Search">
            <input type="submit" value="I'm feeling luck">
        </div>
    </form>
</body>
</html>
```

Create a folder called static in your project and add an html file called index.html

You can then update the app.js file as follows

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

To understand how `sendFile()` works see [the express api refrence](http://expressjs.com/en/api.html#res.sendFile)

> Note: Make it a habit to look up things you don't know.


Your directory should now look like this

```
|-- app.js
|-- node_modules
|-- package.json
`-- static
   `-- index.html
```


### Serving Static Files

A static resource page is a page that is served as is and was not generated pragmatically.

Examples of these resources are html, css, javascript, images, video, and audio files to name a few.

In practice it is generally better to not embed css and javascript code in your html page, and instead split them to separate files and folders.

We will start implementing our hip diary app so let's change index.html.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Diary</title>
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <header>
        <h1>Thoughts for my sanity</h1>
        <h2>Sharing posts I find interesting</h2>
    </header>
    <script src="js/main.js"></script>
</body>
</html>
```

The `<link>` and `<source>` tags are used to refer to external css and javascript files respectively.

You should:-

1. Add a `css` and `js` folder to your static file directory.
2. Add a `style.css` file in your css folder
3. Add a `main.js` file in your js folder

You can oppen the index.html file in your browser by double clicking on the file, dragging it to the browser or if this  ubuntu running

```
$ firefox static/index.html
```

Assuming you're in the diary app directory

Add the following to your style.css file

```css

```

If we run our server and visit `http://localhost:3000` however we will see our html.

```
$ firefox static/index.html
```

Assuming you're inside the diary directory.

let's add a static folder to our project in order to serve some files in our journal.

If you're following along you will notice that our 
So once again we want to serve
You might want to read about how the [express routes work](http://expressjs.com/en/starter/basic-routing.html) and how you can set a static [folder in express][express-static]


## Post Tutorial

- You can try other tutorials to get a fresh perspective [restful app][express-rest] just Google `node rest app tutorial` or any other variations.
- Learn JQuery
    -  the folks on [w3schools](http://www.w3schools.com) have a jQuery reference.
    -  [see try jQuery course](http://try.jquery.com/) should take 3 hours to fully complete.


[npm]: https://docs.npmjs.com/getting-started/what-is-npm
[npm-install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally
[npm-install-g]: https://docs.npmjs.com/getting-started/installing-npm-packages-globally
[npm-install-more]: https://docs.npmjs.com/cli/install
[npm-packages]: https://docs.npmjs.com/getting-started/using-a-package.json
[express]: http://expressjs.com/
[express-install]: http://expressjs.com/en/starter/installing.html
[express-hello]: http://expressjs.com/en/starter/hello-world.html
[express-static]: http://expressjs.com/en/starter/static-files.html

[student-form]: https://docs.google.com/forms/d/1p2NTsF4bZSSeTwakwAbNJaePHwL1VmSQMR0GESy7j2A/viewform
[fork]: https://help.github.com/articles/fork-a-repo/
[sync]: https://help.github.com/articles/syncing-a-fork/
[pull-request]: https://help.github.com/articles/using-pull-requests/
[express-rest]: http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
