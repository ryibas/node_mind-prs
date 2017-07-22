var cylon = require('cylon');

// cylon.robot({
//   connections: {
//     raspi: { adaptor: 'raspi' }
//   },

//   devices: {
//     button: { driver: 'button', pin: 11 }
//   },

//   work: function(my) {
//      my.button.on('push', function() {
//       console.log("Button pushed!");
//     });
//   }
// }).start();

cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' },
    joystick: { adaptor: 'joystick' }
  },

  devices: {
    controller: { driver: 'xbox-360' }
  },

  work: function(my) {
     ["a", "b", "x", "y"].forEach(function(button) {
      my.controller.on(button + ":press", function() {
        console.log("Button " + button + " pressed.");
      });

      my.controller.on(button + ":release", function() {
        console.log("Button " + button + " released.");
      });
    });
    
    my.controller.on("left_x:move", function(pos) {
      console.log("Left Stick - X:", pos);
    });

    my.controller.on("left_y:move", function(pos) {
      console.log("Left Stick - Y:", pos);
    });

    my.controller.on("right_x:move", function(pos) {
      console.log("Right Stick - X:", pos);
    });

    my.controller.on("right_y:move", function(pos) {
      console.log("Right Stick - Y:", pos);
    });

    my.controller.on("lt:move", function(pos) {
      console.log("Left Trigger: ", pos);
    });

    my.controller.on("rt:move", function(pos) {
      console.log("Right Trigger: ", pos);
    });
  }
}).start();