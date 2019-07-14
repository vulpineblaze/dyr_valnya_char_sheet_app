# dyre valnya Character Sheet App
> Character Sheet automator for "dyr valnya" TTRPG

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
  * [Requirements](#requirements)
  * [Usage](#usage)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

[Coda.io Project Documentation](https://coda.io/d/dyr-valnya_d55_RuUt6nh/_su5nF)

Add more general information about project. What the purpose of the project is? Motivation?
Put possible docs / coda link here.

## Screenshots
![Example screenshot](./img/screenshot.png)

## Technologies
* Tech 1 - version 1.0
* Tech 2 - version 2.0
* Tech 3 - version 3.0

## Setup
Describe how to install / setup your local environement / add link to demo version.

### Requirements
If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

### Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Code Examples
Show examples of usage:
`put-your-code-here`

## Features
List of features ready and TODOs for future development
* Awesome feature 1
* Awesome feature 2
* Awesome feature 3

To-do list:
* Wow improvement to be done 1
* Wow improvement to be done 2

## Status
Project is: _in progress_, _finished_, _no longer continue_ and why?

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

## Inspiration
Add here credits. Project inspired by..., based on...

## Contact
Created by [@vulpineblaze](https://github.com/vulpineblaze) - feel free to contact me!

---

## Raw Commands
List of various commands used to get the server working. *Caution: May not be in correct order.*

```
sudo apt-get update
sudo apt-get install nginx 
sudo apt-get install nodejs npm

sudo service apache2 stop # not loaded
sudo service  nginx restart

# change servername to localhost
sudo vim /etc/nginx/sites-available/default 

# allow nginx to route requests from that subdomain to the app
sudo vim /etc/nginx/sites-available/valnya
sudo ln -s /etc/nginx/sites-available/valnya /etc/nginx/sites-enabled/valnya
sudo service  nginx restart

# global angular install
sudo npm install --unsafe-perm -g @angular/cli

cd /var/www

ng new valnya

# npm install   some packages, but im not sure which yet

npm install

ng serve --disable-host-check
-----






sudo mkdir /var/www/printshop
sudo chmod -R 2777 /var/www/printshop

# Didnt have node v10 for Angular
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Should be 10 and 6, respectively
node -v ; npm -v

cd /var/www/printshop

# These will go into package.json, but I'm rebooting the project for fresh everything
npm install body-parser chai chromedriver ejs express express-session mocha mongodb nodemon passport passport-github passport-google passport-google-oauth selenium-webdriver --save

# global angular install
npm install -g @angular/cli
npm install --unsafe-perm -g @angular/cli

sudo ng new printshop

sudo chmod -R 777 /home/ps
npm install



```
