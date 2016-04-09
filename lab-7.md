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

For this tutorial we will be using this app I built https://github.com/amrdraz/aws-wercker.git
fork it and use its urlin the reminder of the tutorial

We want to autimate what we've done on the server when we update our project. To do that you must think of the commands you run whenever you update the server.

updating a project consists of something as follows

- ssh into your server
- if this is the first time
   - clone your project folder
   - cd into it and npm install and build if you need too
   - start the server on you prefered port default 80 for example 
- if you are updating you
   - cd into your projct folder
   - git pull you master branch
   - restart the server

Bash scripts are files that run terminal comands (instead of typing them one by one), we will add a bash script to our server.

To understand what the following files are doing you know what you have to do, lookup
- bash scripts getting started
- bash check if a directory [exists](http://stackoverflow.com/questions/59838/check-if-a-directory-exists-in-a-shell-script)
- bash [variables](http://ryanstutorials.net/bash-scripting-tutorial/bash-variables.php)


ssh into your deployed server and add a update_server.sh

```
$ ssh YOUR_USER@SOME_IP_ADDRESS
$ vi update_server.sh
```

content of `update_server.sh`

> note this setup assumes using nvm and have installed `pm2` if you're using `forever` then you would replace pm2 with forever in the following script though I encourage you to use `npm install pm2 -g` to match this tutorial

```sh
#!/bin/bash

# load the nvm enviroment apparently it is not avalable by default
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

# use node
nvm use 5.9

# check if the directory indicate by -d is not there (! -d "$APP")
# "$APP" is a variable and will be replaced in runtime
if [ ! -d "$APP" ]; then
   # if the app directory is not there we clone (creating a new one) then cd into it
   # the REPO_URL and APP will be suplied in runtime
   # we will be basially saying
   # git clone https://github.com/amrdraz/aws-wercker.git aws-test
   git clone "$REPO_URL" "$APP"
   cd "$APP"
else
   # if the directory is there this means we cloned it before so we cd into it and pull
   cd "$APP"
   # here we're using -f to force pull the master branch
   git pull origin master -f
fi

# now that we are in the updated directory we should rebuild our project in case there are any new packages
npm install

# if we used grunt or culp to build angualr thus would be the point where we
# gulp build

# having completed rebuilding we now start running our app
cd ..

# stop all servers running any server in our case there's just one so this is just me being lazy
# the reason I'm using stop all is to avoid conflicting with your existing app if it's also running port 80
# after stoping I start our app this method is not uptimal since the server would be down for a very small time
# it is better to do somethinglike pm2 rebuild

pm2 stop all
pm2 start "$APP"

# this is just terminating hte bach script successfully
exit 0
```

Now test that the scripts are working
```
$ APP=aws-test REPO_URL=https://github.com/amrdraz/aws-wercker.git ./update_server.sh
```

You will get a permission error
this is because you have to make the file exucutable
```
$ chmod u+x update_server.sh
$ APP=aws-test REPO_URL=https://github.com/amrdraz/aws-wercker.git ./update_server.sh
```

Once you try it out a cuple of times and fail, you will remember that you need to make sure you are using what works with your system :). you can check that the app is running with `pm2 list` and visiting your server

Some possible errors with regards to starting the server

May be that you did not open port 80

```
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --dport 80 -j ACCEPT
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
```
Another server is running on teh existing port
- make sure you stopp all servers if you where using forever adn switched to pm2 `forever stopall`
- you could kill all node processs by typing `killall node`

Remember you can debug the bash cript by simply running in the termianl each command one by one.

### Setting up your CI and CD

Now that our server is ready to recieve autimated comands, we will need a service that will trigger these commands.

There are muliple options but for this course I decided the best practical choice is to use an up and coming CI/CD provider called [wercker](http://wercker.com)

wercker will require you do 3 things
- create an account for your repo and grant wercker permission to access it; in order to pull code from you
- add a wercker.yml file to your repo to tell wercker what to do with your repo when it gets it
- add the wercker app's public key to your amazon instance so that wercker can ssh into it and run your update_script.sh

you will find I have configured a wrecker.yml file already in the repo I asked you to use

https://github.com/amrdraz/aws-wercker
the remaining instructions are on the repo


Best of luck figuring out how this is done :D
