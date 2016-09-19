var People = require('./people');
var User = require('./people');

module.exports = function(app, passport){

	//Getting datas from mongodb
	app.get('/', function(req, res, next){
		res.render('index', {title:'RestApi'});
	});

	//Getting datas from mongodb
	app.get('/hello', function(req, res){
		People.find(function(err, hello){
			if(err){
				return res.send(err)
			}
			res.send(hello);
		})
	});

	//Post datas from mongodb
	app.post('/hello', function(req, res){
		
		var names = new People();
		names.fname = req.body.fname;
		names.lname = req.body.lname;
		names.save(function(err, names){
			if(err){
				return res.send(500, err);
			}
			return res.json(names);

		})
	});

	//Getting data id from mongodb
	app.get('/hello/:id', function(req, res){

		People.findById(req.params.id, function(err, newNames){
			if(err){
				res.send(err);
				
			}
			res.json(newNames)
		})
	});

	//Delete datas from mongodb
	app.delete('/hello', function(req, res){

		People.remove({}, function(err){
			if(err){
				res.send(err);
				
			}
			
		})
	});

	//Delete data id from mongodb
	app.delete('/hello/:id', function(req, res){

		People.remove({_id: req.params.id}, function(err){
			if(err){
				res.send(err);				
			}
			
		})
	});

	//Edit data id from mongodb
	app.put('/hello/:id', function(req, res){

		People.findOne({_id: req.params.id}, function(err, data){
			var newNames = data;
			newNames.fname = req.body.fname;
			newNames.lname = req.body.lname;
			newNames.save(function(err, newNames){
				if(err){
					return res.send(err);
				}
					return res.json(newNames);
			})

		})
	});

	//Get login datas mongodb
	app.get('/logger', function(req, res){
		User.find(function(err, logger){
			if(err){
				res.send(err)
			}
			res.send(logger);
		})
	});

	//Post login datas mongodb
	app.post('/logger', function(req, res){
		var newUser = new User();
		newUser.username = req.body.username;
		newUser.password = req.body.password;
		newUser.save(function(err, newUser){
			if(err){
				res.send(err)
			}
			res.redirect('/')
		})
	});

	app.get('/success', function(req, res){
		res.send({state:'success', user: req.user ? req.user : null});
	});
	app.post('/login',passport.authenticate('local-login', {
		successRedirect: '/success',
		failureRedirect:'/failure',
		failureFlash: true

	}));
	// app.get('/add', isLoggedIn, function(req, res){
	// 	res.render('add.html', {user:req.user});
	// });
	// app.get('/logout', function(req, res){
	// 	req.logout();
	// 	res.redirect('/');
	// });
	app.get('/failure', function(req, res){
		res.send({state:'Failure', user: null, message:"Invalid Username or Password"});
	});
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/success',
		failureRedirect:'/failure',
		failureFlash: true


	}));

};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}