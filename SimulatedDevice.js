'use strict';

// Add the following require statement at start of the file
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var client = null;

var connectCallback = function (err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function(){
            var windSpeed = 10 + (Math.random() * 4);
            var data = JSON.stringify({ deviceId: 'mydevice', windSpeed: windSpeed });
            var message = new Message(data);
            //console.log("Sending message: " + message.getData());
            client.sendEvent(message,function(){});
        }, 1000);
    }
};

function SimulatedDevice (deviceConnectionString, done){
    client = clientFromConnectionString (deviceConnectionString)
    client.open(connectCallback);
}

function printResultFor(op) {
//  return function printResult(err, res) {
//    if (err) console.log(op + ' error: ' + err.toString());
//    if (res) console.log(op + ' status: ' + res.constructor.name);
//  };
}

exports.SimulatedDevice = SimulatedDevice;

