## Environment setup

The course assumes a UNIX shell (Either mac or linux), accordingly if you're a windows user you are requested to setup a UNIX environment follow one of the following guides

1. [create a Bootable usb](http://www.everydaylinuxuser.com/2015/11/how-to-create-ubuntu-1510-usb-drive.html) - we encourage ubuntu 14.x but 15 will do
2. follow the guide suitable to your windows
    - [in case pc was bought with windows 10](http://www.everydaylinuxuser.com/2015/11/how-to-install-ubuntu-linux-alongside.html) - specifically BIOS is (UEFI)
    - [in case you upgraded to 10](http://www.everydaylinuxuser.com/2015/11/how-to-install-ubuntu-linux-alongside_8.html) - specifically BIOS not (UEFI)
    - [in case windows 8](http://www.everydaylinuxuser.com/2014/05/install-ubuntu-1404-alongside-windows.html)
    - [in case windows 7](http://linux.about.com/od/LinuxNewbieDesktopGuide/ss/The-Ultimate-Windows-7-And-Ubuntu-Linux-Dual-Boot-Guide.htm)
    - [General case if the above doesn't apply](https://help.ubuntu.com/community/WindowsDualBoot)
3. if when installing Ubuntu you do not get the option to install along side windows install custom you will need to create 3 partitions one for boot, one for sawp and one for root (/boot, swap, /) respectively boot only needs 200MB swap should be the size of your RAM and home is bigger then 6GB preferably 40 GB should be goo enough.
4. after you're don installing you [can Boot repair](https://help.ubuntu.com/community/Boot-Repair)

> In case you can't install ubuntu for some reason you can follow along on c9.io by creating a custom workspace.

You must have [git installed](http://git-scm.com/download) (obviously)
> mac users may need to install x-code (around 1GB) to use git so you should get that over with

SE uses the [MEAN](http://mean.io/) stack
You can learn the stack on your own by watching [this edx course](https://www.edx.org/course/introduction-mongodb-using-mean-stack-mongodbx-m101x) takes around 5 slots to complete

You will need to have on your system [mongodb](https://docs.mongodb.org/manual/installation/) installed.

You will also need [nodejs](https://nodejs.org/en/) however we encourage you install node using [nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps) in this course we use node 5.x at the time of this writing it is 5.6

We encourage the use of a simple yet pluggable text editor such as [sublime text](https://www.sublimetext.com/3).

We use Google chrome's dev tools in this course - on linux that would be chromium.

## Table of Content

1. [Get started](./lab-1.md)
    - Get started learning HTML and CSS.
    - How to use the terminal.
    - How to open a simple webpage in the browser.
2. [Node and mongodb](./lab-2.md)
    - Get started with mongodb
    - Get stared with node
        - Function Callbacks
        - Modules
    - Basic server
    - Serving file from server
    - npm install
    - Connecting to the database and serving JSON
