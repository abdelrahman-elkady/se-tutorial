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

- Install Git
  - **[Mac users]**
    - You can install git using Xcode command line tools, that would require you to have some download progress, but it is an easy option.
  - **[Ubuntu users]**:
    - install git from `apt` by running the following in the terminal `sudo apt install git`
  - **[advanced] [optional]** If you need the most updated version, you can compile git from source following these [instructions](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-16-04#how-to-install-git-from-source).

- 
