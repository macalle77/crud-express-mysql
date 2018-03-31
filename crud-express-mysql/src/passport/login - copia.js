var LocalStrategy   = require('passport-local').Strategy;
//var User = require('../model/users');
var usermysql = require('mysql')
//var usermysql = require('../model/user-mysql');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, email, password, done) {
            // check in mongo if a user with email exists or not
            var config = require('../libs/config');

            var db=usermysql.createConnection(config);

            db.connect();

            db.query('SELECT * FROM accesos WHERE email= ?', email, function(err,rows,fileds){
              if(err)
                return done(err);
              if(rows.length > 0){
                var user=rows[0];

                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                }
                // User and password both match, return user from done method
                // which will be treated like success
                return done(null, user);
              }
              console.log('User Not Found with email '+email);
              return done(null, false, req.flash('message', 'User Not found.'));
            });
        }
    ));

  var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
  }
}
