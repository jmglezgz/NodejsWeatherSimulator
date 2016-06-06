'use strict';

// Add the following require statement at the start of the file
var iothub = require ('azure-iothub');
var os = require ('os');

function CreateDeviceIdentity (connectionString, done){
    //Create registry with IoTHub connectionString Registry information.
    var registry = iothub.Registry.fromConnectionString (connectionString);

    var device = new iothub.Device(null);

    device.deviceId = 'IoTDevice-100-'+ os.hostname();
    registry.create(device, function (err, deviceInfo, res){
        if (err){
            done (err, deviceInfo, res)
        }

        if (deviceInfo){
            done (null, deviceInfo, res)
        }
    } );
    
}

exports.CreateDeviceIdentity = CreateDeviceIdentity;