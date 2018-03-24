/*module.exports = function () {

  var db = require('./../libs/db-connection')();
  console.log('Datos users:'+ db)
  var Schema = require('mongoose').Schema;

  var User = Schema({
    id: String,
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    username: String
  });

  return db.model('accesos',User);
}*/

var mongoose = require('mongoose');

module.exports = mongoose.model('accesos',{
	id: String,
	lastName: String,
	firstName: String,
	email: String,
	password: String,
	username: String
});
