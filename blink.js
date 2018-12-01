var onoff = require('onoff');
var Gpio = onoff.Gpio,
ledGreen = new Gpio(2, 'out'),
ledRed = new Gpio(3, 'out'),
ledYellow = new Gpio(4, 'out'),
interval;

var pushButton1 = new Gpio(17, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var pushButton2 = new Gpio(27, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 27 as input, and 'both' button presses, and releases should be handled
var pushButton3 = new Gpio(22, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 22 as input, and 'both' button presses, and releases should be handled

// function setLedState(btn, err, value) {
//   if (err) { //if an error
//     console.error('There was an error', err); //output error message to console
//     return;
//   }
// }

pushButton1.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
    return;
  }
  ledGreen.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

pushButton2.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
    return;
  }
  ledRed.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

pushButton3.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
    return;
  }
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

// MARK: Ultrassonic
var usonic = require('mmm-usonic');

usonic.init(function (error) {
  if (error) {
    console.log(error);
    return;
  }
  var sensor = usonic.createSensor(21, 20, 450);
  setInterval(function() {
      console.log('Distance: ' + sensor().toFixed(2) + ' cm');
  }, 1000);
});



function unexportOnClose() { //function to run when exiting program
  ledGreen.writeSync(0); // Turn ledGreen off
  ledGreen.unexport(); // Unexport ledGreen GPIO to free resources
  ledRed.writeSync(0); // Turn ledRed off
  ledRed.unexport(); // Unexport ledRed GPIO to free resources
  ledYellow.writeSync(0); // Turn ledYellow off
  ledYellow.unexport(); // Unexport ledYellow GPIO to free resources

  pushButton1.unexport(); // Unexport Button GPIO to free resources
  pushButton2.unexport(); // Unexport Button GPIO to free resources
  pushButton3.unexport(); // Unexport Button GPIO to free resources

  process.exit();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c