# Lab 8

## Objective

- install android and ionic
- build a To-Do App using ionic


## pre tutorial

Cordova, used by ionic, allows you to build a web app into a a mobile app that can run on any platform.

In ionic the most common platforms you may target are, ios, android, and browser. ~~To build  for ios you will need a Mac.~~ The ionic guide assumes you are a Mac user. accordingly if you're an Ubuntu user you can only target the browser and android platforms.

You don't really need to install these platforms to test, you can signup on ionic.io and upload your apps there for testing and sharing with other people.

In practice you will probably not want to upload your app every-time during development (this is only a valid work-flow in case you don't have a platform like ubuntu not having ios). Therefor we recommend you install the platforms on your device, however you should know that an alternative exists.

### IOS

For Mac users to install ios you will need x-code.

For completeness to build for ios if you don't have a mac you can [follow these instructions for windows](http://community.phonegap.com/nitobi/topics/detailed_guide_for_setting_up_building_ios_apps_without_a_mac)

### Android

The guide references in the middle though not clear [this link](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) for installing android on your system.

To run android you will need to install java and the android sdk. (Estimated size 500MB for both in total)

At the time of writing android requires jdk 1.8 you could install the Oracle version by [downloading it from here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).
You can also do it using the command line by through open-jdk [by following this guide](http://ubuntuhandbook.org/index.php/2015/01/install-openjdk-8-ubuntu-14-04-12-04-lts/)

Google has a nice summary on how to [install android with android studio](http://developer.android.com/sdk/installing/index.html?pkg=tools). Make sure you select instructions for your operating system.

> when your android download is done and you installed the latest SDK try running this tutorial with it

Don't forget in case of Ubuntu

```
$ sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0 lib32stdc++6
```


For emulation you can test in the browser with `ionic serve`
It is generally better to just run from your own android device if possible, in that case you replace emulate with run in the guide.

## Tutorial guide

We recommend you use your laptop and have everything pre-installed to follow the guide normally.
- You will need to run android apps so install the android sdk, for ios apps you will need x-code see pre-tutorial section.
- while you're waiting for android and ios to download you can try to simply follow the getting started guide but only use the browser platform.
- Follow this guild to get started with a To-do app, remember to modify it as instructed bellow.

http://ionicframework.com/docs/guide/preface.html

### Notes about following the guide

- The guide assumes you have a blank page website, so it will give you all the code you need even though some of it may seem there, make sure your index.html for example matches the guide
- Read the links to other parts of the documentation, investing the time in learning a bit more about each part will make your development easier.
- In the Testing your app part, do only browser serve if you still don't have android or the other platforms.
- For ios when you build it may ask you to npm install additional packages.

### Post tutorial

Generally for developing using ionic across platforms you could install the Intel XDK platform
https://software.intel.com/en-us/intel-xdk

Which allows you to create a clean ionic project, features a GUI editor, as well offer a way of emulating across devices without having to install anything extra (for teams with no Mac user).

