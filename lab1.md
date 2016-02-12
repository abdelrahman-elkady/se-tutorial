# Lab 1

## Objective

- Learn HTML and CSS.
- Get familiar with your text editor.
- talk about HTTP status code.
- Show the devetools elements panel and networks panel.
- introduce basic terminal commands.

## Requires

- Internet
- Google chrome
- A plain text editor (preferably sublime)

## Pre

- Complete [the first project](https://dash.generalassemb.ly/) (4 lessons) on dash by gernealassemb.ly

## TA Tutroial Guide

If you don't yet have a unix system you can follow along with the TA

### HTML and CSS

If you didn't complete the dash project do it. (max 30 min).

### Terminal

Ther terminal is a powerful tool for running commands

You should not fear it. Embrace your inner developer and unlock your potential.

Open the terminal in ubuntu the shortcut is `ctrl+alt+t`

#### where are we

To know where we are we can __print working directory__ by typing `pwd`

> $ is not part of the comand and indicates the start of the command

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ pwd
    /Users/draz/se-project/se-tutorial

Notice how it says I'm in `/Users/draz` while the terminal says `~` this is because `~` is an alias for the home directory and is where you usually start your terminal session.

#### what can we see

We can __list__ what is in a directory by typing `ls`

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ ls
    README.md    lab1.md      package.json

This will list all nont hidden files and folder where I currently am

#### Flag

Terminal commands have flags `-a` or `--all` for example is a flag that makes `ls` list all files and directories.

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ ls -a
    .            .git         README.md    package.json
    ..           .gitignore   lab1.md      

> Generally speaking flags follow the sytax --flag_name and -acronym for short so -a is short for typing --all
> Most comands have a -h or --help flag that tells you what options are there

#### Dotfiles

A dotfile like `.gitignore` or directory like `.git` is meant to indicate a hidden file or directory that is otherwise not shown to the user and are useually used for configuration related tasks.

#### Relative path

A reletive path is relative to where you are in the file system

`.` stand for the current directory
`..` stand for previous directory

This is in contrast to an absolute path

`/Users/draz/se-project/se-tutorial`

`ls /Users/draz/se-project/se-tutorial` and `ls .` will have the same output

#### Argument

Terminal commands work like function calls

You type the command followed by an argument `.` means current directory `..` means parent

So `ls .` means list where I currently am and is the default if you don't type anything when useing `ls`.

#### how can we move

To change directory we use `cd`

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ cd ..
    draz at apples-MacBook-Pro.local  ~/se-project
    $ cd se-tutorial/
    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial

The default for `cd` is `cd ~` which cahnges directory back to your home directory.

> typing the tab key while writing will trigger the terminal to autocomplete if directory available (may be case sensitive though).

#### how can we move
To create a folder we make a directory `mkdir`

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ mkdir site

we can check that is was created with `ls`

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ ls
    README.md    lab1.md      package.json     site

we can then move into it with `cd`

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial
    $ cd site
    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial/site

#### using sublime in the terminal

Sublime when installed in Ubuntu comes with it's own command `subl`

Mac users will need to add it just copy and past this into your terminal

    $ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" ~/bin/subl

With `subl` you can tell sublime to open a directory or file

    draz at apples-MacBook-Pro.local  ~/se-project/se-tutorial/site
    $ subl .

From here we can continue editing our files in sublime

We will use the terminal whenever we want to run commands; however, feel free to use a GUI for editing files and navigation chrome technichally has a command as well but you can just open it using the application bar to your right

### index

Now that we have our text editor open go ahead and create google.com (like the one in the lecture).

start by creating an index.html file and write your html there
once done you can see it in the browser by double clicking on the file or by typing `chrome index.html` or firefox `index.html`

You can inspect element and see the html
You can see the http requests via the chrome networks tab (go to a site like the actuall google.com and what happens in the networks tab).

for more on dev tools see [discover-devtools](http://discover-devtools.codeschool.com/)


## Post

For a complete experience building HTML CSS and Javascript pages follow this [guide](https://developer.mozilla.org/en-US/Learn/Getting_started_with_the_web)

Do [this](http://flukeout.github.io/) nice interactive CSS tutorial that teaches how selectors work.

som [CSS concepts](http://adamschwartz.co/magic-of-css/) expalined

For HTTP
http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
http://code.tutsplus.com/tutorials/http-headers-for-dummies--net-8039

For more on dev tools see [discover-devtools](http://discover-devtools.codeschool.com/)