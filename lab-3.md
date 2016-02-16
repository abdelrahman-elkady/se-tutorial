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
    - npm install from package and adding dependency
    - npm test
    - npm run [script]
- How to use git
- Know the git flow.
- How to write unit tests using mocha BDD.
- Send a request to the server with jQuery

After this tutorial you should know everything you need to contribute to an open-source repo as well as run any common tutorial you find online.


## Requires

- Internet
- Google chrome
- A plain text editor (preferably sublime)
- mongodb
- nodejs
- git
- A github account
- npm packges mocha, chai, superagent? Istanbul

## Pre

- Fill this [form][student-form] creating a github account
- Do [try.github.io](https://try.github.io) (15min)
- Do [this nice visualization](http://pcottle.github.io/learnGitBranching/) (you can do just the first 8 levels)

## Tutorial Guide

When working with other people some considerations need to be made.

- Not a single person is aware of the whole project so writing good documentation, clean code, and tests becomes even more important as we will accidentally break code.
- We need a process for collaboration.

In this lab we will get you familiar with git and the git flow while writing some tests for our project and talking about some maintenance practice.

If you have problems with git, still didn't install ubuntu, or still didn't install git, you can use the temporary cloud based Linux instance provided by [cloud9](c9.io)

1. Login to github (create an account if you still didn't filling [the form I had sent you][student-form]
2. login to cloud9 with your github account and create a custom workspace.


### Gitting started with a simple project

If this is your first time using git you will need to configure your computer.

```
$ git config --global user.name "Your Name"
$ git config --global user.email "your_email@whatever.com"
```

> Note: you will need to do this every time you use a university PC otherwise you won't get credit for your work on your project.

#### Create a folder

Create a Folder Called gitnode and `cd` into it

```
draz at apples-MacBook-Pro.local  ~/se-project
$ mkdir gitnode
draz at apples-MacBook-Pro.local  ~/se-project
$ cd gitnode     
```

Now add a single file and call it `hello.js`

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode
$ subl hello.js
```

This should open sublime text and just save, if you don't have sublime use `nano` instead.

this will open the nano terminal editor You can edit as you like in it and save by pressing `Ctrl+X`

#### Starting our repository

You now have a directory with a single file. To create a git repository from that directory, run the git init command.

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode
$ git init
Initialized empty Git repository in /Users/draz/se-project/gitnode/.git/
```

Now add the `Hello, World` program to the repository.

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master
$ git add hello.js
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master
$ git commit -m "First Commit"
```

#### Check the repo's status

Use the git status command to check the current status of the repository.

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master
$ git status
On branch master
nothing to commit, working directory clean
```

The status command reports that there is nothing to commit. This means that the repository has all the current state of the working directory. There are no outstanding changes to record.

We will use the git status command to continue to monitor the state between the repository and the working directory.

#### Making changes

It is time to change our hello program to take an argument from the command line. Change the file to be:

Add a simple Hello world call to `console.log()`.

```js
// hello.js
console.log("Hello World");
```

Check everything is ok by running the file

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode
$ node hello.js
Hello World
```

Now check the status of the working directory.

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master
$ git status
```

You should see something like this

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   hello.js

no changes added to commit (use "git add" and/or "git commit -a")
```

The first thing to notice is that git knows that the hello.js file has been modified, but git has not yet been notified of these changes.

Also notice that the status message gives you hints about what you need to do next. If you want to add these changes to the repository, then use the git add command. Otherwise the git checkout command can be used to discard the changes.

#### Staging Changes

Staging is the process of telling git what you intend on committing.

We stage files also by using the `git add` command.

Now tell git to stage the changes. Check the status

```
$ git add hello.js
$ git status
```

You should see something like this

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master*
$ git add hello.js
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master*
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   hello.js
```

The change to the hello.js file has been staged. This means that git now knows about the change, but the change hasn’t been permanently recorded in the repository yet. The next commit operation will include the staged changes.

If you decide you don’t want to commit that change after all, the status command reminds you that the git reset command can be used to unstage that change.

##### Staging and Committing Cycle

A separate staging step in git is in line with the philosophy of getting out of the way until you need to deal with source control. You can continue to make changes to your working directory, and then at the point you want to interact with source control, git allows you to record your changes in small commits that record exactly what you did.

For example, suppose you edited three files (a.js, b.js, and c.js). Now you want to commit all the changes, but you want the changes in a.js and b.js to be a single commit, while the changes to c.js are not logically related to the first two files and should be a separate commit.

For example you could do the following:

```
git add a.js
git add b.js
git commit -m "Changes for a and b"
git add c.js
git commit -m "Unrelated change to c"
```

By separating staging and committing, you have the ability to easily fine tune what goes into each commit.

#### Committing Changes

Ok, enough about staging. Let’s commit what we have staged to the repository.

When you used git commit previously to commit the initial version of the hello.js file to the repository, you included the `-m` flag that gave a comment on the command line.

The commit command will allow you to interactively edit a comment for the commit. Let’s try that now.

If you omit the `-m` flag from the command line, git will pop you into the editor of your choice. The editor is chosen from the following list (in priority order):

GIT_EDITOR environment variable
core.editor configuration setting
VISUAL environment variable
EDITOR environment variable

If you're using `c9.io` to follow along you should use the `-m` flag

For everyone that has sublime you can configure git to use it [by following these instructions](https://help.github.com/articles/associating-text-editors-with-git/)

Now you can commit

```
$ git commit
```

Sublime should open and you can type a message. When you're done just save the file and close it.

If you didn't change the editor you should see nano open up again with something like this.

```

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   modified:   hello.js
#
```

Just write a message saying you changed hello.js and exit with `Ctrl+X` tap `Y` then the `Enter` key.

If you get vim (another editor) you can do the following.

Press `i` key on your keyboard to enter a message then the `esc` key to go back into command mode followed by typing `:wq` which stands for write and quite.

You should then see this in the terminal

```
$ git commit
[master f7adc76] Hello World log
 1 file changed, 1 insertion(+)
```

Finally let’s check the status again.

```
$ git status
On branch master
nothing to commit, working directory clean
```

#### Changes Not Files

Git keeps track of changes to the file system.

To see that do the following

define a function `print` that will log a word

```js
// hello.js

var print = function (word) {
    console.log(word)
}

```

add these changes to the staging area

```
$ git add hello.js
```

then add some comments explaining the function.

```js
// hello.js

/**
 * print a word the console
 */
var print = function (word) {
    console.log(word)
}

```

Now check the status of the repo

```
$ git status
```

You should see this

```
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   hello.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   hello.js
```

so let's Commit the first change

```
$ git commit -m "Added print function
[master 098ec71] Added print function
 1 file changed, 4 insertions(+), 1 deletion(-)
```

Now git status should show

```
draz at apples-MacBook-Pro.local  ~/se-project/gitnode on master*
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   hello.js

no changes added to commit (use "git add" and/or "git commit -a")
```

Then let's add the second change

```
git add --all
```

The `--all` flag will add all changes in the repo folder without specifying a file or directory, I'm only using it to show you, generally you shouldn't use it and add specific files or directories.

Now commit

```
$ git commit -m "Added Comment"
```


- Now on to github.com and create a new repository
- call it first-repo
- When you create a new repo don't add a readme or .gitignore file just create an empty one
- update the remote as instructed by github.

You should if you refresh your repo page now see your first repository.

Go back to the terminal and add a README.md file

```
subl README.md
```

You should write something like 

```
# My First repo
```

add and commit your change and then update your own repo.

```
$ git push origin master
```

### Using the SE tutorial

In order to get started with the tutorial you can visit one of the forks on your tutorial's organization on github

- https://github.com/se-2016-c-10/se-tutorial.git
- https://github.com/se-2016-c-11/se-tutorial.git
- https://github.com/se-2016-c-12/se-tutorial.git
- https://github.com/se-2016-c-13/se-tutorial.git
- https://github.com/se-2016-c-14/se-tutorial.git
- https://github.com/se-2016-c-15/se-tutorial.git
- https://github.com/se-2016-c-16/se-tutorial.git
- https://github.com/se-2016-b-15/se-tutorial.git
- https://github.com/se-2016-b-16/se-tutorial.git
- https://github.com/se-2016-b-17/se-tutorial.git
- https://github.com/se-2016-dmet/se-tutorial.git

And clone the repo in your working folder

```
draz at apples-MacBook-Pro.local  ~/se-project
$ git clone https://github.com/your-tutorial-organization/se-tutorial.git
```

> switch amrdraz with your tutorial organization which should be one of the above

After you clone cd into the repo and make sure to checkout the start of this lab by running

```
draz at apples-MacBook-Pro.local  ~/se-project
$ cd se-tutorial
draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial on master
$ git checkout lab-3-start
```

This labs starts off where we left off in our previous lab you have a server.js file and some test.js files which we used to try out some javascript.

### Collaborating

Now that you know how to use git you can start contributing to our se-tutorial repo.

Remember tho we don't ever commit to the master branch

```
$ git branch [yourname]
```

In order to create a new branch from the current one

```
$ git checkout [yourname]
```

Now anything you do here will not affect the original project

Your TA should by now should have updated the team.md file with your names.

You can check that an update was made by running

```
$ git fetch
```

go back to master and pull the changes

```
$ git checkout master
$ git pull origin master
```

now merge master with your branch

```
$ git checkout [yourbranch]
$ git merge master
```

Update team.md file with your github username and fun fact about yourself and commit. (You should know how to do this by now if you followed the tutorial so far).

when you're done push your branch to the online repo.

```
$ git push origin [yourbranch]
```

You may be blocked from pushing if you're not a collaborator you should ask your TA to add you to the organization.

## Post Tutorial

For more detail try following [this online tutorial book](http://gitimmersion.com), which I used to build most of the content in this tutorial.





[student-form]: https://docs.google.com/forms/d/1p2NTsF4bZSSeTwakwAbNJaePHwL1VmSQMR0GESy7j2A/viewform