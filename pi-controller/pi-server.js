var cylon = require('cylon');

cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    led: { driver: 'led', pin: 11 }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();