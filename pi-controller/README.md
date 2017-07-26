# pi-controller

This is the node process that listens for XBox 360 controller events. It then takes these events and then using socket.io emits them on localhost:3001.

There are two JavaScript files that are used.

1. test-wrapper.js - This is an test wrapper hosted in Express that when running, you can launch a browser and navigate to localhost:3001/ and click 'rock', 'paper', or 'scissors' and events will be emited. This can be used to test the events on a dev machine that doesn't have an Xbox 360 controller hooked up to it.

    ` node test-wrapper.js `


2. index.js - The typical script used once the XBox 360 controller is plugged in to the raspberry pi.

    ` npm start `

## Libraries Used

1. Socket.io - used to emit and catch events. 
2. xbox-controller-node - XBox 360 controller node module for Raspberry Pi.
3. Express - used to host the test wrapper hosted on localhost:3001