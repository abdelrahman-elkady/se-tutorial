# Deployment:

This guide will move you through the process of creating and setting up your server, installing dependencies, and deploying your application.

#### Note:
> This guide is using AWS 75$ offer from GitHub education pack with qwikLABS support, you can still use the 110$ offer by activating a credit card, or use other providers such as DigitalOcean

## Steps:

### Setup your account:
- Go to your [GitHub education pack page](https://education.github.com/pack)
- Under AWS Educate, claim your offer and setup your account ![github-pack](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0008.png)

### Setting up the instance

- Select EC2 Instance from AWS console ![aws-console](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0001.png)

- Press on Launch instance under **Create instance** section to start creating and setting up your instance ![create-instance](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0002.png)

- Select your OS image, use **Ubuntu 16.04 - 64 bit** ![os-img](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0003.png)

- Select the **t2.micro** instance ![instance-type](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0004.png)

- Press **Review and Launch**

- When prompted to select the keypair, select the option to create new keypair and give it a name ![keypair-gen](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0006.png)

- **[[ IMPORTANT ]]** Do **NOT** delete your keypair, you will lose access to the instance if your keypair is lost.

- Setup the permissions of your downloaded keypair by running the following command, adjust your path to the keypair    

  ```bash
  $ sudo chmod 600 /path/to/your/keypair.pem
  ```

- Try logging in your instance using SSH, run the following command (On the first time, you will be prompted to accept that the key will be permanently added to your known hosts, accept that by **TYPING** `yes` then press enter)

  ```bash
  $ ssh -i your-key-pair.pem ubuntu@IP_ADDRESS
  ```
  You can bring the IP Address of the machine from AWS console -> Running instances.
  ![instance-info](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0007.png)

### More on keys:

**This part is not that important in the mini project deployment, however, it will be important when you need to have multiple people accessing the same server later**

To authenticate with the server, you either use the downloaded keypair, or by having your public key in the server's `authorized_keys`, in this section, we will setup the keys of authorized users on the server.

#### NOTE:
If you already setup SSH key before ( for GitHub for example ), you can skip the next section and use your existing key.

#### Generate a SSH key on your machine

- Use SSH keygen to generate a new key
  ```bash
  $ ssh-keygen -t rsa
  ```

- This will create a public and private key pair on your machine, the default location is `~/.ssh/`.
  Your public key will have `.pub` at the end, your private key should **NEVER** be shared or copied anywhere.

- SSH to the server using the command we executed before, by specifying the `.pem` keypair as identification file.
  ```bash
  $ ssh -i your-key-pair.pem ubuntu@IP_ADDRESS
  ```

- **On your machine** copy the content of the public key file into the clipboard, run `$ cat ~/.ssh/id_rsa.pub` and copy the output.

- **On the server** Paste the public key in `~/.ssh/authorized_keys`, you can create the file and open it using `nano` or `vim` or any editor of your choice.
  ```bash
  $ nano ~/.ssh/authorized_keys
  ```
  To save the file in `nano` after pasting the key, press `Ctrl + X` --> `Y` --> `Enter`

- After this, logout from the server, you should now be able to login again without specifying the keypair explicitly.
  ```bash
  $ ssh ubuntu@IP_ADDRESS
  ```

- With that, you can add multiple keys from different users, allowing your team members to have access to the server.

### Deploy your application to the server:

To deploy the application you created on the server, we need first to setup the environment on the server. Fortunately, the internet speed on the server is blazingly fast, which will be done in minutes.

- Setup the environment by using the [environment guide](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/environment_setup.md), please follow the guide for an Ubuntu 16.04 machine as our server is running on that OS image.

- Copy your code onto your server, the easiest way to do that is to push your code to GitHub repository and clone it on the server, this will also allow you to easily pull changes you apply to your codebase at any time.

- Configure your network to open a port for your application, this can be done by visiting the **Network and Security** section in your AWS console. 
![networks-security-tree](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0009.png)

- Select and edit the inbound rules, **ADD** a new rule with `TCP` with the port you want to open.
![security-inbound](https://github.com/abdelrahman-elkady/se-tutorial/blob/master/assets/images/screenshot-0010.png)

#### NOTE:
> Do **NOT** remove the SSH port, otherwise, you will lose the ability to connect with SSH to your instance.

- Now, install `PM2` or `forever`, those are tools to manage your processes and let them run forever in the background, allowing your app to run in the background without the need to remain connected to the server, and without the need to keep the node process on the terminal.

  ```bash
  $ npm install -g pm2
  ```
- `cd` into your application directory, install the dependencies by running `npm install`. Then, instead of starting your app using `node startingFile.js`, run `pm2 start startingFile.js`.
