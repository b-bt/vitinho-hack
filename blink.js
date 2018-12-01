var onoff = require('onoff');
var Gpio = onoff.Gpio,
ledGreen = new Gpio(2, 'out'),
ledRed = new Gpio(3, 'out'),
ledYellow = new Gpio(4, 'out'),
interval;

interval = setInterval(function () {
  var value = (ledRed.readSync() + 1) % 2;
  ledGreen.writeSync(value);
  ledRed.writeSync(value);
  ledYellow.write(value, function() {
    console.log("Changed LED state to: " + value);
  });
}, 2000);

// process.on('SIGINT', function () {
//   clearInterval(interval);
//   led.writeSync(0);
//   led.unexport();
//   console.log('Bye, bye!');
//   process.exit();
// });