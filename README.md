# dyr valnya Character Sheet App
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
* [Dev Flow](#dev-flow)

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
sudo apt-get install -y nginx nodejs npm

sudo service apache2 stop # not loaded
sudo service  nginx restart

# change servername from "_" to "localhost"
sudo vim /etc/nginx/sites-available/default 

# allow nginx to route requests from that subdomain to the app
sudo vim /etc/nginx/sites-available/valnya
sudo ln -s /etc/nginx/sites-available/valnya /etc/nginx/sites-enabled/valnya
sudo service  nginx restart

# global angular install
sudo npm install --unsafe-perm -g @angular/cli

# Didnt have node v10 for Angular
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Should be 10, 6, and 8 respectively
node -v ; npm -v ; ng --version

cd /var/www

# fix perms
sudo mkdir /var/www/valnya
sudo chmod -R 2777 /var/www/valnya

ng new valnya  # Y to angular routing

cd valnya
npm install

screen -S valnya_angular

ng serve --disable-host-check

Ctrl-A then Ctrl-D

```
____

## Contributing
##### Overview
The best way to contribute is to make some characters and give us feedback! The best way to give feedback is to create issues for the bugs you find.
##### Issues
* Title
  *  A short, simple snippet about your problem. 
  *  Please use proper nouns
  *  Please avoid saying "broken", "fix", etc..  If it wasn't broken and needing fixing, it wouldn't be an issue. 
  *  Eg. "Player shoots multiple bullets each mouse click"
* Description
  * Provide a description somewhat like the following:
    * What were you doing when the issue occured?
    * What is the exact effect of the issue?
    * What exactly was supposed to happen instead?
  * This format allows to rapid digestion of your issue, and make its easier to reproduce, debug, and correct.  
  * Eg. "I clicked twice on the second stage, and got 400 bullets instead of 4."  
* Labels, Milestones, Assignment, etc..  
  * These are for the devs to help sort and deal with issues effeciently, and we do not expect or want help with this.  
  * Please don't mess with them.
 
##### Development

 * Fork repo || Create branch
 * Prepare your work station
   *  Make sure you have Git , puTTy, WinSCP, and your favorite text editor.
 * Make your changes
   *  `git clone` the repo, and follow the "typical dev workflow" below.  
 *  Do's and Dont's
   *  Don't push to master. If you type `git push` or `git push origin master` you are most likely doing something wrong. 
     * use `git push origin <your_branch_name_goes_here>` instead. 
     * If you are having trouble getting your changes back into master, I'll gladly help|fix|do it for you.   
   *  More to come soon(tm), since no one has messed up the repo (yet)...
 * Submit pull request via github
   * Provide what issue you fixed ( pound sign, then the issue number, eg #42 )
   * Detail your change (aka what you did exactly)
   * Provide additional info to tell others how to test your change (Prove you fixed the issue.)
 
____
____
## Dev Info
### Git
This section will include various git command combonations, to help prevent any **Ooops'** happening to the repo or anyones personal code. 
Some sweet links:

[git command cheat sheet](https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf)

[git markdown guide](https://help.github.com/articles/markdown-basics/)

#### Git command "variables"
Some of these command will have a spot with a vairable, like this: \<variablename\>. 

These will be described here:
* \<branchname\>  The name of the branch you are working on. We are currently *mis*using "master"
* \<variablename\>  from the example, not used.
 

____
#### Typical dev workflow

Before opening the project, pull changes from the repo:
* `git pull`

Then do some work. Once you are done, push the changes into github:
* `git add .`   -   You may have to use the flag "-A"
* `git commit -m "I did this, that, and the other!"`
* `git pull`
* `git push origin <branchname>`


____
#### To Wipe All Local Changes

##### This will destroy any work you have done!
##### Make a copy of your work manually! Run this at your own risk!

* `git fetch origin`
* `git reset --hard origin/master`

____
#### Issues, Branches, etc..
Heres a few links to warm-up:
[Using pull requests](https://help.github.com/articles/using-pull-requests/)
[Basic Branching & Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

##### View all branches branch
* `git branch`

##### Making a branch
* `git checkout -b <branchname> `
  *  This is shorthand for these two commands:
  *  `git branch <branchname>`
  *  `git checkout <branchname>`
* `git push origin <branchname> ` 
  * Now github knows about your branch

##### Setting remote for a branch
* `git remote add <remote_server>`
  * OPTIONAL: probably gonna wanna keep this origin
* `git push origin <branchname> ` 
  
##### Deleting a branch locally
* `git branch -D <branchname> `

##### Working in your branch, and not master
To change between branches, simply run the command:
* 'git checkout <branchname>'

##### Merging your branch with master, or some other branch.
coming soon(TM)

---

## Dev flow

##### Address an Issue, then create a Pull request
This workflow has the user take a fresh issue, make a branch, complete the issue, and merge the branch back into master.

* `git checkout -b <branchname> `
  * Use the issue+number as the name, plus some descriptive text (Eg. For issue#53 use "**iss53-fix-the-bug-we-found**")
  * If you already have the branch, leave out the **-b** flag

Do work as per the typical workflow. Once you have you last commit pushed, do this:
* Goto github.com and create a pull request.
  * [github tut](https://help.github.com/articles/creating-a-pull-request/)
* Assuming the auto-merge feature is working, fill in the details secion and create the merge.
  * If not, github gives you that helper list of commands. Do those.
  * Then try to `git pull`
  * If there are still merge errors, try using the GitGUI
    * I did this and was able to fix the merge super fast.
* At the bottom, there will be a button to merge: Press it.
* Once that is complete, github will say that you can delete the branch. Do that too.
  * Your commits aren't deleted, they are moved to be under 'master', and so your branch contains no useful info now.
* On the command line, run the following commands
  * `git pull origin <branchname>`
    * This will inform you your branch is gone.
    * This step may not be needed. I did it and everything worked in the end.
  * `git checkout master`
  * `git pull origin master`
* At this point you should be in master, and have all your changes from the branch. You're done!

