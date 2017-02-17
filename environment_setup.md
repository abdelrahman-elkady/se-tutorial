## Main Setup

This is a walk-through to setup the operating system and environment on your machine for the SE course.

The course assumes a UNIX shell (Either **Mac** or **Linux**), accordingly if you are a windows user you are requested to setup a UNIX environment following one of the following guides.

#### General requirements:
- Linux or Mac
- Git
- NodeJS
- MongoDb
- Text editor
- **Modern** web browser


### Linux
For non-mac users, this section will help you setup a Linux distributions alongside your favorite OS (Windows ?) or as a standalone operating system. **For mac users, you can skip to the [next section](#environment-setup)**

You can use any Linux distribution, we recommend Ubuntu 14.04 LTS Or 16.04 LTS. This guide will help you setup your environment on both based on your choice, if you chose another distribution, you are geeky enough to continue the setup :wink:


#### Setting up a dual boot with windows:
If you have windows setup and you need to have both windows and Ubuntu installed on the same machine, you can follow this section.

- [Download Ubuntu 14.04 or 16.04](https://www.ubuntu.com/desktop)
- [Create a bootable USB drive](http://www.everydaylinuxuser.com/2015/11/how-to-create-ubuntu-1510-usb-drive.html)
- Pick the suitable scenario for your setup:
    - [In case pc was bought with windows 10](http://www.everydaylinuxuser.com/2015/11/how-to-install-ubuntu-linux-alongside.html) - specifically BIOS is (UEFI)
    - [In case you upgraded to windows 10](http://www.everydaylinuxuser.com/2015/11/how-to-install-ubuntu-linux-alongside_8.html) - specifically BIOS not (UEFI)
    - [In case windows 8](http://www.everydaylinuxuser.com/2014/05/install-ubuntu-1404-alongside-windows.html)
    - [In case windows 7](http://linux.about.com/od/LinuxNewbieDesktopGuide/ss/The-Ultimate-Windows-7-And-Ubuntu-Linux-Dual-Boot-Guide.htm)
    - [General case if the above doesn't apply](https://help.ubuntu.com/community/WindowsDualBoot)

- If while installing Ubuntu you did not get the option to install alongside windows, select custom install, you can follow [the great wiki on stack exchange](http://askubuntu.com/questions/343268/how-to-use-manual-partitioning-during-installation).     

 You will need to create 3 partitions one for home, one for swap and one for root (/home, swap, /) respectively `root (/)` only needs around 10-20GB, `swap` should be the size of your RAMx2 _(If you have 16 GB RAM --> 32 GB for swap)_, for `/home`, you need a partition bigger than 6GB **Preferably 40GB+**, that's your main partition that you will use.

### Environment Setup
- **[Ubuntu only]** update your apt cache and your packages after first installation by running the following commands in the [terminal](http://askubuntu.com/questions/183775/how-do-i-open-a-terminal)
  ```bash
  $ sudo apt update
  $ sudo apt upgrade
  ```

#### Installing Git
- **[Mac users]**
  - You can install git using Xcode command line tools, that would require you to have some download progress, but it is an easy option.
- **[Ubuntu users]**:
  - install git from `apt` by running the following in the terminal `sudo apt install git`
- **[advanced] [optional]** If you need the most updated version, you can compile git from source following these [instructions](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-16-04#how-to-install-git-from-source).

- Verify your installation by running `$ git --version`, you should expect some output like `git version 1.9.1`

#### Installing NodeJS
- To install NodeJS, we will use [nvm](https://github.com/creationix/nvm), follow these steps to get it installed:
  - **[Mac]** you still need Xcode's command line tools installed if you did install git from source and skipped this part.
  - **[Ubuntu]** Install `build-essential` and `libssl-dev` packages through apt:
    ```bash
    $ sudo apt install build-essential libssl-dev
    ```
  - run the following command to install nvm
    ```bash
    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    ```
  - Restart your terminal session _i.e open a new terminal_ and run the following commands to install node 6.9.5
  ```bash
  $ nvm install 6.9.5
  $ nvm alias default 6.9.5
  $ nvm use 6.9.5
  ```
  - Verify your installation by running the following commands, expect some output similar to the following:
  ```bash
  $ node --version
  >> v6.9.5
  $ npm --version
  >> 4.1.2
  ```

#### Installing MongoDb

##### Ubuntu 14.04

Run the following commands:
```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

$ echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

$ sudo apt update

$ sudo apt-get install -y mongodb-org

# verify your installation by running
$ service mongod status

# Expect output like
>> mongod start/running, process 1611
```

##### Ubuntu 16.04
Run the following commands:
```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

$ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

$ sudo apt update

$ sudo apt-get install -y mongodb-org

$ sudo nano /etc/systemd/system/mongodb.service
```
Copy the following lines and paste it there (Ctrl + Shift + v), then close and save the file by hitting `Ctrl + x` then `y`

```
[Unit]
Description=High-performance, schema-free document-oriented >database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```

Continue executing the following commands
```bash
$ sudo systemctl start mongodb

# verify that mongodb is running correctly
$ sudo systemctl status mongodb

# you should expect an output like
>> ● mongodb.service - High-performance, schema-free document-oriented database
   Loaded: loaded (/etc/systemd/system/mongodb.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2016-04-25 14:57:20 EDT; 1min 30s ago
 Main PID: 4093 (mongod)
    Tasks: 16 (limit: 512)
   Memory: 47.1M
      CPU: 1.224s
   CGroup: /system.slice/mongodb.service
           └─4093 /usr/bin/mongod --quiet --config /etc/mongod.conf

# run the last command
$ sudo systemctl enable mongodb
```


##### Mac

- Install [homebrew](http://brew.sh/)
- Run the following commands:
  ```bash
  $ brew update
  $ brew install mongodb
  ```

#### Install a Text Editor
You can use any text editor of your choice, we recommend using [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/) or [VSCode](https://code.visualstudio.com/), but you are free to choose whatever editor you like.

#### Install a modern web browser
Obviously, you will need some browser to run your web application on, we recommend using Google Chrome during this course.


## Grub Fix
what grub do is provide us with menu to choose every time we open the PC to choose which OS we wanna open.
Here are two solutions for fixing a broken Grub setup:

1. Automatic repairing using Boot-Repair
https://help.ubuntu.com/community/Boot-Repair

2. Manual repairing using terminal
  - [Recommended manual solution](https://www.howtogeek.com/114884/how-to-repair-grub2-when-ubuntu-wont-boot/)
  - [Alternative manual solution](https://help.ubuntu.com/community/RecoveringUbuntuAfterInstallingWindows)

If all previous approaches failed, you should go along [this guide](http://askubuntu.com/questions/88384/how-can-i-repair-grub-how-to-get-ubuntu-back-after-installing-windows)
