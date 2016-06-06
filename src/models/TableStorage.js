var azure = require ('azure-storage');

//Table Storage Object
module.exports = TableStorage;

function TableStorage (storageClient, tableName, partitionKey, callback){
    this.storageClient = storageClient;
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    this.storageClient.createTableIfNotExists (tableName, function tableCreated (error, result, response){
        if (error){
            callback (error, result,response);
        }else {
            callback (null, result,response);
        }
    });
}

TableStorage.prototype = {
    get: function (query, callback){
        self = this;
        self.storageClient.qeryEntities (self.tableName,query, null, function entitiesQueried (error, result) {
            if (error){
                callback(error);
            }else {
                callback (null, result.entries);
            }
        });
    },
    addCapital: function (item, callback){
        self = this; 
        // use entityGenerator to set types 
        // NOTE: RowKey must be a string type, even though it cotains a GUID in this example.
        var itemDescriptor = {
            PartitionKey: {'_':item.PartitionKey},
            RowKey: {'_':item.RowKey},
            name: {'_':item.Name},
            continent: {'_':item.ContinentCode},
            capital: {'_':item.Capital,},
            deviceId: {'_':'null'}
        };
        self.storageClient.insertEntity (self.tableName, itemDescriptor, function entityInserted(error){
            if (error){
                callback (error);
            }
            callback (null)
        });
    },
    addWeather: function (item, callback){
        self = this; 
        // use entityGenerator to set types 
        // NOTE: RowKey must be a string type, even though it cotains a GUID in this example.
        var itemDescriptor = {
            PartitionKey: {'_':item.PartitionKey},
            RowKey: {'_':item.RowKey},
            Enero:{'_':item.Enero},
            Febrero:{'_':item.Febrero},
            Marzo:{'_':item.Marzo},
            Abril:{'_':item.Abril},
            Mayo:{'_':item.Mayo},
            Junio:{'_':item.Junio},
            Julio:{'_':item.Julio},
            Agosto:{'_':item.Agosto},
            Septiembre:{'_':item.Septiembre},
            Octubre:{'_':item.Octubre},
            Noviembre:{'_':item.Noviembre},
            Diciembre:{'_':item.Diciembre},
            Unit: {'_':item.Unit},
        };
        self.storageClient.insertEntity (self.tableName, itemDescriptor, function entityInserted(error){
            if (error){
                callback (error);
            }
            callback (null)
        });
    },

}