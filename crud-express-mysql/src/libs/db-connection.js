const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

let db;

module.exports = function Connection() {

  if (!db) {
    /*db = mongoose.createConnection('mongodb://miguel:miguel@192.168.56.102:27017/tasks', {
      useMongoClient: true
    });*/

    db = mongoose.createConnection('mongodb://miguel:miguel@192.168.56.102:27017/tasks');

    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ');
    });


    mongoose.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

  }
  console.log('Datos' + db);

  return db;
}
