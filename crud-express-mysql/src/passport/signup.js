var LocalStrategy   = require('passport-local').Strategy;
//var User = require('../model/users');
var usermysql = require('mysql')
//var usermysql = require('../model/user-mysql');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

 passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                var config = require('../libs/config');

                var db=usermysql.createConnection(config);

                db.connect();

                db.query('SELECT * FROM accesos WHERE username= ?', username, function(err,rows,fileds){
                  if(err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                  }
                  if(rows.length > 0){
                    console.log('User already exists with username: '+username);
                    return done(null, false, req.flash('message','User Already Exists'));
                  }
                  else {
                        // if there is no user with that email
                        // create the user
                        var newUser = {
                        // set the user's local credentials
                          lastName : req.param('lastName'),
                          firstName : req.param('firstName'),
                          email : req.param('email'),
                          password : createHash(password),
                          username : username
                        };
                        // save the user
                        db.query('INSERT INTO accesos SET ?', newUser, function(err, rows, fields){
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
