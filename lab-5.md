# Lab 5

## Tutorial Expected Objective

We will continue to build on the diary app that we completed in lab-4.md

By the end of the lab you should have acquired.

- An understanding of a template language.
- How to build dynamically rendered websites
- How to send a post request via html form
- How to use Bootstrap to style our app.
- Building our CRUD the traditional way.
- Moving our templates to the front end again.
- Building our CRUD in our REST API.
- Testing our app.

## Requires

- Internet
- Google chrome
- A plain text editor (preferably sublime)
- mongodb
- nodejs
- git
- npm packages express, mongodb, mocha, chai, supertest istanbul

## Pre

- If you haven't yet fill this [form][student-form] while creating a github account.

## Pre-requisite

- Lab 4 is a prerequisite to redo it assuming you cloned the se-tutorial repo

```
$ git checkout lab-4-start
```

## Tutorial Guide

To follow along this tutorial just

```
$ git checkout lab-5-start
```

### Objective

This project picks up where the last left off as we build our ~~sanity maintaining~~ diary app.

So far we designed a single page of the diary app showing a single post that is loaded form the database via an ajax request.

![starting-app](./assets/lab-5/diary-start.png)

You can try it out by running

```
$ npm start
```

Make sure you `npm install` if you just started this project.

We want to add the following features to our app

- As a User I should be able to see all posts
- As a User I should be able to delete a post
- As a User I should be able to view a single post on a separate page.
- As a User I should be able to update a post

### DRY

Before we proceed it is worth our time to talk a bit about dryness and good development practice.

At the heart of most software is a guiding principle called [DRY][dry], which stand for don't repeat yourself.

I'll leave it up to your curious mind to research more on the topic here you will find a list of [software development philosophy][dev-philosophy] for the curious mind.

But the bottom line is that being DRY is good
- A Singe update easily propagate across the system.
- Less repetition => Less bugs => More time

A couple of things that keep our code dry is sufficient abstraction, separation of concern (data form presentation from logic), modularity and focus (aka specializing our code).

By the end of lab-4 your app.js may have wound-up looking like this

```js
// app.js
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
```

This is bad design already our app is connecting to the database, handling setup logic, starting the server, serving api routes, populating our database on start.

We're gonna start to separate our logic.

Before we do let's switch to a new branch in case we screw things up

```
$ git checkout -b dry-up
```

#### Decouple DB

First off if we start separating logic (decoupling) we will probably want to use the db connection object more then once, therefor it is better to do this once in a separate file and then reuse.

Create a file called db.js that will export database logic for our app.

```js
//db.js
var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/diary_db';
var post = {
    "header": "Title added with JavaScript From DB",
    "body": "This post's body text was populated by sending a get request to /api/post"
};

var DB = {
     seed: function seed(cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('post').insert(post, function(err, result) {
                assert.equal(null, err);
                assert.equal(1, result.result.n);
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
```

We separated in the db logic the setup functionality connection and using the db into separate functions. We also decided that we will remove everything in the database every-time we seed so as to not create replicas in the database.

For now this is enough abstraction for our database our app.js now looks like this.

```js
var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static('static'));

app.get('/api/post', function(req, res, next) {
    db.db().collection('post').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

db.connect(function(err) {
    console.log('connected to db');
    db.seed(function () {
        console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    });
});
```

We can now take a moment to test this by running our project

```
$ npm start
```

Click on load post to check that the database part works. If you detect any errors you can debug with `console.log()`.

Once you're sure everything is clear add and commit your changes

```
$ git add db.js
$ git add app.js
$ git commit -m "decoupled db logic"
```

##### Decouple server

Now lets move our server running logic to a separate file called server.js

```js
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
```

And app.js looks like this

```js
var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static('static'));

app.get('/api/post', function(req, res, next) {
    db.db().collection('post').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

module.exports = app;
```

Once again npm start to check that everything is ok

> Note you will need to update package.json start script to run `node server.js` instead of `node app.js`

Once you're sure everything is clear add and commit your changes

```
$ git add server.js
$ git add app.js
$ git add package.json
$ git commit -m "decoupled server logic"
```

#### Decouple Posts

Finally we want to decouple our post logic from the app.js file. There are in fact 2 logic that should be addressed.

One is the route logic the other is the model logic for now though we will just decouple into a route.

Since our app can have multiple routes it would be better to create a folder for our routes.

Our new diary app directory tree should look like this

```
 /Users/draz/se-project/se-tutorial/diary
|-- app.js
|-- db.js
|-- node_modules
|-- npm-debug.log
|-- package.json
|-- routes
|  `-- posts.js
|-- server.js
|-- static
|  |-- css
|  |-- img
|  |-- index.html
|  |-- js
|  `-- post.json
```

we will use the [express.Router](http://expressjs.com/en/guide/routing.html#express-router) object, posts.js should look like this

```js
// routes/posts,js
var db = require('../db.js');
var express = require('express');
var router = express.Router();

router.get('/api/post', function(req, res, next) {
    db.db().collection('post').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

module.exports = router;
```

And app should look like this

```js
// app.js
var express = require('express');
var app = express();

app.use(express.static('static'));

app.use(require('./routes/posts'));

module.exports = app;
```

Once more We're done with this restructure.

```
$ npm start
```

Test the app everything clear

```
$ git add app.js
$ git add routes
$ git commit -m "decoupled posts logic"
```

#### nodemon

One last thing another important habit for developers is to optimize their work-flow.

So far every-time we changed the app we had to stop the server and restart it in order to see the changes.

There's an npm package that that will watch our server files and automatically restart the server on change called [nodemon](https://www.npmjs.com/package/nodemon). Install it globally so that we use it from now on

```
$ npm install -g nodemon
```

>  Node: You may need to `sudo npm install -g nodemon`

We will once again change our npm start script to say `nodemon server.js` instead of `node server.js`

And with that our app is now structures in a much better way.

```
$ npm start
```

Test the app everything clear

```
$ git add package.json
$ git commit -m "started using nodemon"
```

We're done restructuring the diary app merge back into your master branch.

```
$ git checkout master
$ git merge dry-up
```


### Templates


In case you were not following along or had any trouble you can continue from here by checking out this section.

```
$ git checkout lab-5-2
```

#### Background

Have you ever printed something like.

```js
console.log("Draz wrote a post");
```

or 

```js
var str = "Draz has written 10 posts"
console.log(str); 
```

In both those cases the information/data is tied to the representation.

The first statement is a greeting to a person calling him by his name

A way to abstract away the data form the representing in the first statement could be

```js
var name = "Draz"
console.log(name+" wrote a post");
```

The second

```js
var person = {
    name: "Draz",
    postCount: 10
}
var str = person.name + " has written "+ person.postCount + " posts";
console.log(str); 
```

The `" has written "`, `"" wrote a post"` and `" posts"` are all presentation ie. they are there to make the information more understandable.

In our index.html a single post can be presented as a string of this form.

```js
var html = '<article class="post-list-item">' +
    '<h3 class="post-list-item-header">This is an example of a post</h3>' +
    '<section class="post-list-item-body">' +
        'We will populate this with ajax later but sometimes it is better to start off designing statistically before we go dynamic' +
    '</section>' +
'</article>';
```

An abstraction of the data might be presented as

```js
var post = {
    title: 'This is an example of a post',
    content: 'We will populate this with ajax later but sometimes it is better to start off designing statistically before we go dynamic'
}
var html = '<article class="post-list-item">' +
    '<h3 class="post-list-item-header">'+post.title+'</h3>' +
    '<section class="post-list-item-body">' +
        post.content +
    '</section>' +
'</article>';
```

You might notice that as this presentation logic grows some redundancy starts to emerge, in this case we have a lot of `+` string concatenations in our code.

Starting javascript version 6 we have [template strings][template-literal] so we can rewrite the last statement as

```js
var post = {
    title: 'This is an example of a post',
    content: 'We will populate this with ajax later but sometimes it is better to start off designing statistically before we go dynamic'
}
var post_html = `<article class="post-list-item">
    <h3 class="post-list-item-header">${post.title}</h3>
    <section class="post-list-item-body">
        ${post.content}
    </section>
</article>`;
```

This abstraction comes in handy when we start repeating ourselves example having more then one post, we can create a function that will render this template for us

```js
var post Template = function(post) {
    return `<article class="post-list-item">
    <h3 class="post-list-item-header">${post.title}</h3>
    <section class="post-list-item-body">
        ${post.content}
    </section>
</article>`;
}

var post_html = postTemplate({
    title: 'This is an example of a post',
    content: 'We will populate this with ajax later but sometimes it is better to start off designing statistically before we go dynamic'
})
```

We can then create function for rendering posts.

```js
var postsTemplate = function(posts){
    var postsHtml =  ""
    for (var i=0; i< posts.length;i++) {
        postsHtml += postTemplate(posts[i]);
    }
    return `<section class="post-list">
    ${postsHtml}
</section>`
};

var posts = [
    {
        title: 'This the first post',
        content: 'First post'
    },
    {
        title: 'This a second post',
        content: 'second post has more insight into the human spirit'
    },
]
var html = postsTemplate(posts)
```

#### Serving a dynamic page

We could re-write our app.js to serve a dynamic page response using the idea of templates.

Once again since we're working on a new feature so that we don't ruin anything let's create a new branch

```
$ git checkout -b user-templates
```

Add an index.js route in your routes folder.

```js
// routes/index.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var html = indexTemplate([
        {
            title: 'This the first post',
            content: 'First post'
        },
        {
            title: 'This a second post',
            content: 'second post has more insight into the human spirit'
        },
    ]);
    res.set('Content-Type', 'text/html');
    res.send(html);
});

var indexTemplate = function (posts) {
    return `<!DOCTYPE html>
<html>

<head lang='en'>
    <title>My Diary</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" />
    <link rel="stylesheet" href="css/style.css" />
</head>

<body>
    <header class="header flex-align">
        <h1 class="align-item">Thoughts for my sanity</h1>
    </header>
    <button class="post-load-btn">Load Post</button>
    ${postsTemplate(posts)}
    <script src="js/jquery-2.2.1.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>`;
}

var postsTemplate = function(posts){
    var postsHtml =  ""
    for (var i=0; i< posts.length;i++) {
        postsHtml += postTemplate(posts[i]);
    }
    return `<section class="post-list">
    ${postsHtml}
</section>`
};

var postTemplate = function(post) {
    return `<article class="post-list-item">
    <h3 class="post-list-item-header">${post.title}</h3>
    <section class="post-list-item-body">
        ${post.content}
    </section>
</article>`;
}

module.exports = router;
```

And change app.js as follows

```
// app.js
var express = require('express');
var app = express();
var db = require('./db.js');

app.use(require('./routes/index'));
app.use(require('./routes/posts'));

app.use(express.static('static'));

module.exports = app;
```

Now if we start our app we should see the index page render the posts we wrote in the index route

> You Do: modify the seed function to insertMany posts and load them from the db when we visit the index route.

When you're done test and commit

```
$ git add routes
$ git add app.js
$ git commite -m "dynamically load /"
```


#### Hogan

Hogan is a template language, usually this means that it provides additional features like control flow statement on top of the abstraction of using variables. You can learn more form the [hogan site][hogan]

> Note: other popular node template languages include jade, ejs, and nunjucks

Hogan does not provide logic statements unlike the other tho

```
$ npm install hjs --save
```

We will separate our templates form our route them to their own file in its own file.
we will place this file in a new directory called views as a means of indicating.

Express has the option of setting a template engine so we will modify our app.js and add

```
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
```

just before we start using the routes.

We also set `views/index.hjs`

```html
<!DOCTYPE html>
<html>

<head lang='en'>
    <title>My Diary</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" />
    <link rel="stylesheet" href="css/style.css" />
</head>

<body>
    <header class="header flex-align">
        <h1 class="align-item">Thoughts for my sanity</h1>
    </header>
    <button class="post-load-btn">Load Post</button>
    <section class="post-list">
        {{#posts}}
        <article class="post-list-item">
            <h3 class="post-list-item-header">{{title}}</h3>
            <section class="post-list-item-body">
                {{content}}
            </section>
        </article>
        {{/posts}}
    </section>
    <script src="js/jquery-2.2.1.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>
```

Finally in `routes/index.js` we

```
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
```

checkout your website to check that everything is ok you should be seeing the posts.

```
$ git add routes
$ git add app.js
$ git add package.json
$ git add views
$ git commite -m "is using hjs as view engine"
```

### Bootstrap

[Bootstrap][bootstrap] is a collection of predefined css that is open for you to reuse. The idea is that you would use the bootstrap classes to style your html without having to go through all the details that will ensure cross browser consistency. To learn about it simply read tier [very good documentations](http://getbootstrap.com/getting-started/) a or this [w3schools][w3bootstrap].

We will use bootstrap to build a form to submit into the server, I went and got [a material theme](https://bootswatch.com/paper/) which is compatible with the flat design we're going for.

Create a form with title and content as inputs and submit submit to `/posts` with method post add body parser to express and create a new post.

create a post.hjs page displaying the post and have each link link to it's page






## Post Tutorial




[dev-philosophy]: https://en.wikipedia.org/wiki/List_of_software_development_philosophies
[dry]: https://en.wikipedia.org/w/index.php?title=Don%27t_repeat_yourself&oldid=707025035
[template-literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[hogan]: http://twitter.github.io/hogan.js/
[bootstrap]: http://getbootstrap.com/
[w3bootstrap]: http://www.w3schools.com/bootstrap/
[express]: http://expressjs.com/
[express-install]: http://expressjs.com/en/starter/installing.html
[express-hello]: http://expressjs.com/en/starter/hello-world.html
[express-static]: http://expressjs.com/en/starter/static-files.html
[mongo-getting-started]: http://mongodb.github.io/node-mongodb-native/2.1/getting-started/
[student-form]: https://docs.google.com/forms/d/1p2NTsF4bZSSeTwakwAbNJaePHwL1VmSQMR0GESy7j2A/viewform
[fork]: https://help.github.com/articles/fork-a-repo/
[sync]: https://help.github.com/articles/syncing-a-fork/
[pull-request]: https://help.github.com/articles/using-pull-requests/
[express-rest]: http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
