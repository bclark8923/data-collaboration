'use strict';

// set up ========================
var express  = require('express'),
	routes  = require('./server/routes/index'),
	app      = express(),							// create our app w/ express
	morgan = require('morgan'),             		// log requests to the console (express4)
	bodyParser = require('body-parser'),    		// pull information from HTML POST (express4)
	methodOverride = require('method-override'), 	// simulate DELETE and PUT (express4)
	pg = require('pg').native,							// node postgresql connector
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  Sequelize = require('sequelize'),
  PassportLocalStrategy = require('passport-local').Strategy,
  routes = require('./server/routes/index'),
  models = require('./server/models'),
  path = require('path'),
  session = require('express-session');
  // User = require('./server/models/user');

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs'); 

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));                                    // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(cookieParser());     
app.use(methodOverride());

app.use(session({
  secret: 'reMQgKVgJ8Wp8PoQ7hjaVjJIFdRop3Mj',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(models.User.createStrategy());

passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

// routes ======================================================================
require('./server/routes')(app);

// app.use('/auth', auth);

// Routes

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

// Launch the app
app.set('port', (process.env.PORT || 5000));

models.sequelize.sync().then(function () {
  app.listen(app.get('port'), function() {
    console.log("Node app is running at:" + app.get('port'));
  });
});