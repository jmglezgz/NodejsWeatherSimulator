'use strict';

// add require libraries
var device = require ('./CreateDeviceIdentity');
var azure = require ('azure-storage')
var sendMessage = require ('./SimulatedDevice');
var TableStorage = require ('./models/TableStorage');
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

//Import Capital Data
var capitalTableName = nconf.get ("CAPITAL_TABLE_NAME");
var capitalPartitionKey = nconf.get ("CAPITAL_PARTITION_KEY");

// var capitalTable = new TableStorage( azure.createTableService(accountName,accountKey), capitalTableName, capitalPartitionKey, function (error, result, respond){
//         if (error){
//             throw error;
//         }
//         var capitals = JSON.parse(fs.readFileSync('./src/data/capitals.json', 'utf8'));
//         var sensorPlace = null;
//         for (var i in capitals){
//             capitalTable.addCapital (capitals[i], function itemAdded (error){
//                 if (!error){
//                     var sensorPlace = capitals[i];
//                 }
//                 else{
//                     throw error;
//                 }
//             });
//             if (sensorPlace){ break; };
//         }
//         console.log ('Sensor Place: ' + sensorPlace.name);
//     });

var results = [];
var capitals = JSON.parse(fs.readFileSync('./src/data/capitals.json', 'utf8'));
(function next(index) {
    if (index === capitals.length) { // No items left
        console.log("se ha llegado al final");
        return;
    }
    var sensorPlace = capitals[index];
    capitalTable.addCapital (capitals[i], function itemAdded (error){
    search(query, function(result) {
        results.push(result);
        next(index + 1);
    });
})(0);



    
//Import Capital Data
var capitalTableName = nconf.get ("CAPITAL_TABLE_NAME");
var capitalPartitionKey = nconf.get ("CAPITAL_PARTITION_KEY");
var storageClient = azure.createTableService(accountName,accountKey);
var sensorPlace = null;
var capitalTable = new TableStorage( storageClient, capitalTableName, capitalPartitionKey, function (error, result, respond){
    if (error){
        throw error;
    }
        // console.log(i);
        // storageClient.retrieveEntity(capitalTableName, capitalPartitionKey, capitals[i].RowKey, function(error, result, response){
        //     if(!error){
        //         console.log(i + result);
        //     }else{
        //         console.log(i);
        //     }
        //     if (error){
        //         capitalTable.addCapital (capitals[i], function itemAdded (error){
        //         if (error){
        //             throw error;
        //         }else{
        //             var sensorPlace = capitals[i];
        //         }
        //         });
        //     }else {console.log(result);}
        //        });
});
var capitals = JSON.parse(fs.readFileSync('./src/data/capitals.json', 'utf8'));
capitalTable.addCapital (capitals[i], function itemAdded (error){
    
var capitals = JSON.parse(fs.readFileSync('./src/data/capitals.json', 'utf8'));
for (var i in capitals){
    capitalTable.addCapital (capitals[i], function itemAdded (error){
        if (!error){
            sensorPlace = capitals[i];
        }
    });
    if (sensorPlace){ break; };
}


var capitals = JSON.parse(fs.readFileSync('./src/data/capitals.json', 'utf8'));

AsignCapital (capitals[0]);

function AsignCapital (Capitals){
if (i < capitals.lenght & sensorPlace == null){
    capitalTable.addCapital (Capitals[i], function itemAdded (error){
        if (error){
            AsignCapital (Capitals, i, sensorPlace);
        }else{
            sensorPlace = Capitals[i];            
        }    
    });
}}
// //Import Wetather Data Table
// var weatherTableName = nconf.get ("WEATHER_TABLE_NAME");
// var weatherPartitionKey = nconf.get ("WEATHER_PARTITION_KEY");

// var weatherTable = new TableStorage(azure.createTableService(accountName,accountKey), weatherTableName, weatherPartitionKey, function (error, result, respond){
//         if (error){
//             throw error;
//         }
//         var weatherData = JSON.parse(fs.readFileSync('./src/data/weatherData.json', 'utf8'));
//         for (var i in weatherData){
//             weatherTable.addWeather (weatherData[i], function itemAdded (error){
//                 if (error){
//                     throw error;
//                 }
//             });
//         }
        
//     });





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
