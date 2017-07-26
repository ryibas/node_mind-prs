# node_mind-prs

## Overview

This project is a simple AI/Neural Network using brain.js which is a simple JavaScript Neural Network. It attempts to learn how to play Rock-Paper-Scissors by a simple neural network that is fed the correct way of responding to a particular RPS play.

![alt text](overview.png "Overview Diagram")

## Setup, Installation, and Running

### Getting the Repo
1. Clone the repo down from GitHub.

    `git clone https://github.com/ryibas/node_mind-prs.git`

### Setting up and running the Pi-Controller Listener
1. Navigate to the cloned directory and `cd` into the folder *pi-controller*. Execute the following command. This will install all of the required node_modules needed. You only need to run this command the first time.

    ` npm install `

3. You can now launch the pi-controller Xbox listener. Ensure a XBox 360 controller is plugged into the Raspberry Pi and type the following. Leave this command running and open up a new Terminal window.

    ` npm start `

### Setting up and running the Pi-View 
1. Open up a new Terminal/Command window.

2. Now we need to install and launch the ReactJS site that houses the AI logic and hosts the display of the game. Change directory into the /node_mind_prs/pi-view directory and execute the following command. You only need to run this command the first time.
   
    ` npm install `

3. You can now launch the pi-view ReactJS site. Type the following command in and leave this window running. This will launch a browser and navigate to localhost:3000 where the site is running.

    ` npm start `