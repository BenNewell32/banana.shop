var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();

var db = require('../models');



router.get('/', function(req, res){
    res.render('login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   db.User.findOne({where: {user_name: username}}).then(function(user){
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	user.validPassword(password).then((isMatch) => {
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	db.User.findOne({where:{id: id}}).then(function(user){
		done(null, user);
	});
});

router.post('/signin',
	passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}),
		function(req, res){
			res.redirect('/');
		});

router.post('/register', function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var passwordVerify = req.body.password_check;

	req.checkBody('username', 'Name is required').notEmpty();
	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('password_check', 'passwords must match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('login', {
			errors: errors
		})
	}
	else{
		var userinfo = {
			user_name: username,
			email: email,
			password: password
		}

		db.User.create(userinfo).then(function(user){
			user.generateHash(user.password).then((hash) => {
				user.password = hash;
				console.log(user);
				user.save();
			});
		});

		req.flash('success_msg', 'Registry successful, you may now login');

		res.redirect('/login');
	}



});

module.exports = router;
