var onoff = require('onoff');
var Gpio = onoff.Gpio,
ledGreen = new Gpio(2, 'out'),
ledRed = new Gpio(3, 'out'),
ledYellow = new Gpio(4, 'out'),
interval;

var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
    return;
  }
  ledGreen.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
  ledRed.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
  ledYellow.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

// interval = setInterval(function () {
//   var value = (ledRed.readSync() + 1) % 2;
//   ledGreen.writeSync(value);
//   ledRed.writeSync(value);
//   ledYellow.write(value, function() {
//     console.log("Changed LED state to: " + value);
//   });
// }, 2000);

function unexportOnClose() { //function to run when exiting program
  ledGreen.writeSync(0); // Turn ledGreen off
  ledGreen.unexport(); // Unexport ledGreen GPIO to free resources
  ledRed.writeSync(0); // Turn ledRed off
  ledRed.unexport(); // Unexport ledRed GPIO to free resources
  ledYellow.writeSync(0); // Turn ledYellow off
  ledYellow.unexport(); // Unexport ledYellow GPIO to free resources

  pushButton.unexport(); // Unexport Button GPIO to free resources

  process.exit();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c