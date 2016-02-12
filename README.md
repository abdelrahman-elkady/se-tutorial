# SE Tutorial

A starter template for the se classes

This will contin documentation on each lab

This tutorial marks the start of a tutorial project led by the TA

The objective is to build an app together where the scrum maser is the TA.
Each person in the tutorial will be later assigned a task (issues) and asked to do a simple thing in the tutorial that makes sure their familiar with the topic discussed in the lab.

## How this works

This repo is cloned by each tutorial group in the beginign of the lab and is used to track progress throughout the course.

- A lab[x].md file for each lab will be present to guide to the lab
    + Every lab.md has a pre, a tutorial and post section
    + pre is for things the student should do before and is for saving time in the actual tutorial.
    + the tutorial is for making sure the student understands the objectives and is adapted based on the work done by the sutdents so far.
    + the post section is for extra reading and extending on the topics covered.
    + each lab start and end commit is marked by a tag `lab-n-start` and `lab-n-end` where n is the lab number.
- A branch is created wen working on a lab.
    + TA tags the branch so that people can refer back to it in case they wanna start from that point/follow along.
- The TA manages the fork
- Each tutorail group maintains will have a development branch that they merge too the master branch will remain pure only for receiving updates from the original fork (this isn't a requirment normally it is just for organization).

> If there an any issues open an issue on [the original repo](https://github.com/amrdraz/se-tutorial)

## Enviroment setup

The course assumes a UNIX shell (Either mac or linux), acordingly if you're a windows user you are requested to setup a UNIX enviroment follow one of the following guids

1. [create a bootable usb](http://www.everydaylinuxuser.com/2015/11/how-to-create-ubuntu-1510-usb-drive.html) - we encourage ubuntu 14.x but 15 will do
2. follow the guide sutable to your windows
    - [in case pc was bought with windows 10](http://www.everydaylinuxuser.com/2015/11/how-to-install-ubuntu-linux-alongside.html) - specifically BIOS is (UEFI)
    - [in case you upgraded to 10](http://www.everydaylinuxuser.com/2015/11/how-to-install-ubuntu-linux-alongside_8.html) - specifically BIOS not (UEFI)
    - [in case windows 8](http://www.everydaylinuxuser.com/2014/05/install-ubuntu-1404-alongside-windows.html)
    - [in case windows 7](http://linux.about.com/od/LinuxNewbieDesktopGuide/ss/The-Ultimate-Windows-7-And-Ubuntu-Linux-Dual-Boot-Guide.htm)
    - [General case if the above doesn't apply](https://help.ubuntu.com/community/WindowsDualBoot)

> In case you can't install ubuntu for some reason you can follow along on c9.io by creating a custom workspace.

You must have [git installed](http://git-scm.com/download) (objviously)
> mac users may need to install x-code (around 1GB) to use git so you should do that over wifi

SE uses the [MEAN](http://mean.io/) stack
You can learn the stack on your own by watching [this edx course](https://www.edx.org/course/introduction-mongodb-using-mean-stack-mongodbx-m101x) takes around 5 slots to complete

You will need to have on your system [mongodb](https://docs.mongodb.org/manual/installation/) installed.

You will also need [nodejs](https://nodejs.org/en/) however we encourage you install node using [nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps) in this course we use node 5.x at the time of this writing it is 5.6

We encourage the use of a simple yet plugable text editor such as [sublime text](https://www.sublimetext.com/3).

We use google chrome's dev tools in this course - on linux that would be chromium.

## Table of Content

To visit any lesson type in the terminal
    
    git checkout lab-n-start

where n is the number of the lab you can visit subsection by typing

    `git checkout lab-n-m`

where m is the number of the section in the lesson.

1. [Get started](./lab-1.md)
    - Get started learning HTML and CSS.
    - How to use the terminal.
    - How to open a simple webpage in the browser.
2. [Node and mongodb](./lab-2.md)
    - Get stareted with mongodb
    - Get stared with node
        - Function Callbacks
        - Modules
    - Basic server
    - Serving file from server
    - npm install
    - Connecting to the database and serving JSON







