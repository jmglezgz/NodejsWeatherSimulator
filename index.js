'use strict';

// add require libraries
var device = require ('./CreateDeviceIdentity');
var azure = require ('azure-storage')
var sendMessage = require ('./SimulatedDevice');
var tableStorage = require ('./models/TableStorage');
var _ = require('underscore');

var fs = require('fs');

//
//Environment var and config file.
//
//Table Storage
var nconf = require ('nconf');
nconf.env().file({file:'./config.json', search: true});
var accountName = nconf.get ("STORAGE_NAME");
var accountKey = nconf.get ("STORAGE_KEY");

// you must get this information from IoTHub in Azure 
var IoTHostName = nconf.get("IOT_HOST_NAME");
var IoTSharedAccessKeyName = nconf.get("iothubowner");
var IoTSharedAccessKey = nconf.get("EGHFck8ECs1/rrk/SWa3oM64sK3UKx3cCXPFFbZpWII=");


//Get Capital and Insert into Table Storage with DeviceId
var capitalTableName = nconf.get ("CAPITAL_TABLE_NAME");
var capitalPartitionKey = nconf.get ("CAPITAL_PARTITION_KEY");

var capitals = JSON.parse(fs.readFileSync('./data/capitals.json', 'utf8'));
var capitalTable = new tableStorage( azure.createTableService(accountName,accountKey), capitalTableName, capitalPartitionKey,function (error, result, response){
    if (error){
        throw error;
    }
    var weather = false;
    AsignCapital (capitals, 0,null);

    function AsignCapital (Capitals, i, place){
    if (i < capitals.length & place == null){
        capitalTable.addCapital (Capitals[i], function itemAdded (error){
            if (error) {
                i += 1;
                AsignCapital (Capitals, i, place);
            }
            if (!weather){
                place = Capitals[i];            
                //Import Wetather Data Table
                var weatherTableName = nconf.get ("WEATHER_TABLE_NAME");
                var weatherPartitionKey = nconf.get ("WEATHER_PARTITION_KEY");

                var weatherTable = new tableStorage(azure.createTableService(accountName,accountKey), weatherTableName, weatherPartitionKey, function (error, result, respond){
                        if (error){
                            throw error;
                        }
                        var weatherData = JSON.parse(fs.readFileSync('./data/weatherData.json', 'utf8'));
                        var capitalWeather = _.where(weatherData, {PartitionKey: place.RowKey});

                        for (var RowKey in capitalWeather){
                            weatherTable.addWeather (capitalWeather[RowKey], function itemAdded (error){
                                if (error){
                                    throw error;
                                }
                            });
                        }
                        weather = true;
                    });
                }
            });
        }
    }
})

//Define connectionString with your custom IoTHub connection String.
// var connectionString = 'HostName=' + IoTHostName + ';SharedAccessKeyName=' + IoTSharedAccessKeyName + ';SharedAccessKey=' + IoTSharedAccessKey;


// device.CreateDeviceIdentity (connectionString, function (err, deviceInfo, res){
//     if (err) {
//         return;
//     }
//     if (deviceInfo){
//         var IoTDevice = deviceInfo;
//         var deviceConnectionString = 'HostName=' + IoTHostName + ';DeviceId=' + IoTDevice.deviceId + ';SharedAccessKey=' + IoTDevice.authentication.SymmetricKey.primaryKey;
// //        sendMessage.SimulatedDevice (deviceConnectionString);
//     }

// } );




// function printDeviceInfo (err, deviceInfo, res){
//     if (deviceInfo){
//         console.log ('Device id: ' + deviceInfo.deviceId);
//         console.log('Device key: ' + deviceInfo.authentication.SymmetricKey.primaryKey);
//     }
// }
