# Lab 3

## Objective

- Make sure everyone understands the code for running a simple server (should exist in repo they clone)
    - connecting to the database
    - responding with a file
    - responding with JSON
    - node module syntax (require/export)
    - npm install locally
- create package.json
    - read package.json
    - npm install from package and adding dependencey
    - npm test
    - npm run [script]
- How to use git
- Know the git flow.
- How to write unit tests using mocha BDD.
- Send a request to the server with jQuery

After this tutorial you should know everything you need to contribute to an opernsource repo as well as run any common tutorial you find online.


## Requires

- Internet
- Google chrome
- A plain text editor (preferably sublime)
- mongodb
- nodejs
- git
- A github account
- npm packges mocha, chai, superagent? instanbule

## Pre

- Fill this [form](https://docs.google.com/forms/d/1p2NTsF4bZSSeTwakwAbNJaePHwL1VmSQMR0GESy7j2A/viewform) creating a github account
- Do [try.github.io](https://try.github.io) (15min)
- Do [this nice visualization](http://pcottle.github.io/learnGitBranching/) (you can do just the first 8 levels)

## Tutroial Guide

Ok so now that we have some files and a server but we're not the only people working on the project.

When working with other people some considerations need to be made.

- Not a single person is aware of the whole project so writing good documentation, clean code, and tests becomes even more important as we will accedentlly break code.
- We need a process for collaboration.

In this lab we will get you familiar with git and the git flow while writing some tests for our project and talking about some maintenense practice.

If you have problems with git, still didn't install ubuntu, you can use the temporary cloud based linux instanse provided by [c9.io](c9.io)


### Gitting the SE tutorial

In order to get started with the tutorial you can visit one of the forks on your tutorial's organization on github

- https://github.com/se-2016-c-10/se-tutorial.git
- https://github.com/se-2016-c-11/se-tutorial.git
- https://github.com/se-2016-c-12/se-tutorial.git
- https://github.com/se-2016-c-13/se-tutorial.git
- https://github.com/se-2016-c-14/se-tutorial.git
- https://github.com/se-2016-c-15/se-tutorial.git
- https://github.com/se-2016-b-15/se-tutorial.git
- https://github.com/se-2016-b-16/se-tutorial.git
- https://github.com/se-2016-b-17/se-tutorial.git
- https://github.com/se-2016-dmet/se-tutorial.git

And clone the repo in your working folder

```
draz at apples-MacBook-Pro.local  ~/se-project
$ git clone https://github.com/amrdraz/se-tutorial.git
```

> switch amrdraz with your tutorial organization which should be one of the above

After you clone cd into the repo and make sure to checkout the start of this lab by running

```
draz at apples-MacBook-Pro.local  ~/se-project
$ cd se-tutorial
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
$ git checkout lab-3-start
```

This labs starts off where we left off in our previous lab you have a server.js file and some test.js files which we used to try out some javacript.

### Git ready

Now to get familiar with git we'll make a local copy of the repo for us to experiment with without affecting the main master branch.

Follow along as we simulate several situations you will deal with in your respective projects.

```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
$ git branch gitready
```

In order to create a new branch from the current one

```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
$ git checkout gitready
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on gitready
```

Now anything we do here will not affect the original project


> still pending rest of lab since most peopl don't finish past this point

go back to master


```
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on gitready
$ git checkout gitready
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
```

create a new branch with your name and add your name to the teams page

Push your branch to the repo

```
$ git push origin draz
```

submit a pull request to merge

## Post Tutorial

For more detail try following [this online tutorial book](http://gitimmersion.com), you don’t need to have ruby installed as you never run the files you create.





[mdn-re-intro-to-js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript