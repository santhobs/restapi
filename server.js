var express = require('express'),
	path = require('path'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	body = require('body-parser'),
	cookie = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	morgan = require('morgan'),
	flash = require('connect-flash'),
	app = express();

require('./js/passport')(passport);
require('./js/people');
mongoose.connect('mongodb://localhost/restdb');



app.use(morgan('dev'));
app.use(body.json());
app.use(cookie());
app.use(body.urlencoded({extended: false}));
app.use(session({secret:'anystring',
				saveUninitialized:true,
				resave:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'views')));
// app.get('/san', function(req, res){
// 	res.send("Hello World");
// 	console.log(req.cookies);
// 	console.log('***********');
// 	console.log(req.session);
	
// })



require('./js/api')(app, passport);







app.listen(3020, function(){
	console.log("Server is running 3020");
});	