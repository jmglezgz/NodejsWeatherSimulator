
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
