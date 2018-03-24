var express = require('express');

var model = require ('../model/task');

var access = require ('../model/users');

var router=express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  console.log("hola autenticación");
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport){

    /*
    router.get('/saludo', function(req,res){
      res.render('saludo',{ message: req.flash('message') });
    });

    router.post('/prueba', function(req,res){
      res.render('welcome',{ message: req.flash('message') });
    });
    */

    /* GET login page. */

    router.get('/', function(req, res) {
      // Display the Login page with any flash message, if any
      res.render('index', { message: req.flash('message') });
    });

      /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
      res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash : true
    }));

    /* Handle Home Page and the rest*/

    router.get('/home', isAuthenticated, (req, res) => {
      model.find({}, (err, tasks) => {
        if (err) throw err;
          res.render('home', {
          title: 'CRUD',
          tasks: tasks
        });
      });
    });

    router.post('/add',isAuthenticated ,(req, res) => {
      let body=req.body;
      body.status=false;
      console.log ("nuevo");
      model.create(body, (err, task) => {
        if(err) throw err;
        res.redirect('/home');
       });
    });

    router.get('/turn/:id', isAuthenticated, (req, res)=> {
      let id=req.params.id;
      console.log("cambio");
      model.findById(id, (err,task)=>{
        if(err) throw err;
        task.status = !task.status;
        task.save()
          .then(() => res.redirect('/home'))
      });
    });

    router.get('/delete/:id', isAuthenticated, (req, res, next) => {
      let id= req.params.id;
      console.log("borrado");
      model.remove({_id: id}, (err,task)=>{
        if(err) throw err;
        res.redirect('/home');
      });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    return router;
}



/*module.exports = router;*/
