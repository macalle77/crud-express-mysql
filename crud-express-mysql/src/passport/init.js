var login = require('./login');
var signup = require('./signup');
var User = require('../model/users');

module.exports = function(passport){

 // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        console.log('deserializing user:',obj);
        done(null, obj);        
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}
