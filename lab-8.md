# Lab 8



## tutorial guide

We recomend you use your laptop and have everything preinstalled to follow the guide normally.
- you will need to run android apps is ot install teh android sdk, for ios you will need x-code.
- the tutroial is designed to run without them simply follow the getting started guide but only use the browser platform.
- In case you attend the lab without your laptop you can use c9.io (since the university pc's take foreveer to downlaod)

Follow this guild to get started with a To-do app, remember to modify it as instructed bellow.
http://ionicframework.com/docs/guide/preface.html

Since you can not install on c9.io the android sdk or ios's x-code you can only test your app using the browser platform.

```
$ ionic platform add browser
```

instead of android or ios

when building use

```
$ ionic build browser
```

and to run simply type

```
$ ionic serve
```

in the case of c9.io can only preview using the 0.0.0.0:8080, so you run

```
$ inoic serve -a -p 8080
```

### Intel XDK

Generally for developing using ionic across platforms I would recomend installin the intel XDK platform
https://software.intel.com/en-us/intel-xdk

which allows you to create a clean ionic project, features a GUI editor, as well offer a way of emulating across devices without having to install anything exta.

