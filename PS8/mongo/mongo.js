//This code is from https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
const mongoClient = require('mongodb').MongoClient;
const config = require("../config.json");
const mongoURL = config.db.host;

let _db;

module.exports = {

    connect: function( callback ) {
        mongoClient.connect( mongoURL,  { useNewUrlParser: true }, function( err, client ) {
            _db  = client.db(config.db.db);
            return callback( err );
        } );
    },
    getDB: () => { return _db; }


}
