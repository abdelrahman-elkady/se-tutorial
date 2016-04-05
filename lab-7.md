# Lab 7

## Objective

- continious integration
- continious deployment

## Tutorial Guide

Continous deployment works by either delivering or having the server update the content of you appication based on a recent commit to your repo

we will setup the scripts that will handel starting and stoping you app server

in this version of the tutorial I'm using pm2 and I setup the server's node with nvm
in case you're following along with the lecture you will need to adapt the files to your setup (remove nvm and use forever instead of pm2)

### prepairing your server

ssh into your deployed server and add a start_server.sh and a stop_server.sh

```
$ ssh ubuntu@SOME_IP_ADDRESS
$ vi stat_server.sh
```
content of `start_server.sh` (note this setup assumes using nvm)
```sh
#!/bin/bash

# load the nvm enviroment apparently it is not avalable by default
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

nvm use 5.9

if [ ! -d "$APP" ]; then
	git clone https://github.com/amrdraz/aws-wercker "$APP"
	cd "$APP"
else
	cd "$APP"
	git pull origin master -f
fi
npm install
cd ..
pm2 start "$APP"

exit 0
```
`stop_server.sh`
```sh

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

nvm use 5.9

if [ -d "$APP" ]; then
	pm2 stop all
fi

exit 0
```

Bash scripts are essentially files that run terminal comands (instead of typing them one by one)

To understand what these files are doing you know what you have to do, lookup
- bash scripts getting started
- bash check if a directory [exists](http://stackoverflow.com/questions/59838/check-if-a-directory-exists-in-a-shell-script)
- bash [variables](http://ryanstutorials.net/bash-scripting-tutorial/bash-variables.php)

test that the scripts are working
```
$ App=aws-test ./start_script.sh
```

You will get a permission error
check how to resolve this permission error (hint it's done with chmod)

once you try it out a cuple of times and fail, you will remember that you need to make sure you are using what works with your system (eg: if you don't have pm2 you either change that part of the script or you install pm2, or changing the git rep ur rl :P )

### setting up your CI

Now that our server is ready to recieve autimated comands, we will need a service that will trigger these commands.

There are muliple options but for this course I decided the best practical choice is to use an up and coming CI/CD provider called [wercker](http://wercker.com)

wercker will require you do 3 things
- create an account for your repo and grant wercker permission to access it; in order to pull code from you
- add a wercker.yml file to your repo to tell wercker what to do with your repo when it gets it
- add the wercker app's public key to your amazon instance so that wrcker can ssh into it and run your start_script.sh

you will find I have configured a repo which you can clone and work with https://github.com/amrdraz/aws-wercker


Best of luck figuring out how this is done :D

you can see my latest live deployed build [here](http://52.18.99.192/)
