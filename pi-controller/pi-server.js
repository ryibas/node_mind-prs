var cylon = require('cylon');

cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    led: { driver: 'led', pin: 11 },
    button: { driver: 'button', pin: 2 }
  },

  work: function(my) {
     my.button.on('push', function() {
      console.log("Button pushed!");
    });
  }
}).start();