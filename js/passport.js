var localStrategy = require('passport-local').Strategy;

var User = require('./people');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		})
	});
	passport.use('local-signup', new localStrategy({
		// usernamefield:'username',
		// passwordfield:'password',
		passReqToCallback:true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'username':username}, function(err, user){
				if(err)
					return done(err)
				if(user){
					return done(null, false);
				} else {
					var newUser = new User();
					newUser.username = username;
					newUser.password = newUser.generateHase(password);
					newUser.save(function(err, newUser){
						if(err)
							throw (err)
						return done(null, newUser)
						
						
					})
				}

			})
		})
	}


	));

	passport.use('local-login', new localStrategy({
		// usernamefield:'username',
		// passwordfield:'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'username': username}, function(err, user){
				if(err)
					return done(err)
				if(!user)
					return done(null, false);
				if(!user.validPassword(password))
					return done(null, false);
					return done(null, user);
			})
		})
	}



	))


}