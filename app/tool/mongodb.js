
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.default');
const assert = require('assert');


module.exports = (options,callback) => {
  let url = config.mongodb;
  options = options ? options : {};
  const dbName = options.Collection;

  MongoClient.connect(url,function(err,client){
    assert.equal(null,err);
    const adminDb = client.db(dbName).admin();

    adminDb.listDatabases(function(err, dbs) {
      assert.equal(null, err);
      callback(adminDb);
      assert.ok(dbs.databases.length > 0);
      client.close();
    });
  });

} 


