'use strict';

var passport = require('passport'),
	auth = require('../controllers/auth'),
	organization = require('../controllers/organization'),
	question = require('../controllers/question');

module.exports = function(app) {

	var isAuthenticated = function(req, res, next){ 
		if (!req.isAuthenticated()) {
			res.send(401).end(); 
		} else {
			next();	
		} 
	};

	// Load landing page
	app.get('/', function(req, res) {
		res.render('index');
	});
	
	// Load the AngularJS app
    app.get('/app', function(req, res) {
        res.sendfile('./public/app/index.html');
    });

    // Route to test if the user is logged in or not 
    app.get('/loggedin', auth.loggedin);
    
	// Handle Registration POST
    app.post('/auth/signup', auth.signup);

    // Handle Login POST
    app.post('/auth/login', passport.authenticate('local'), auth.login)

    // Handle Logout POST
    app.post('/auth/logout', auth.logout);

    // Handle Organization Creation POST
    app.post('/organization/create', isAuthenticated, organization.create);

    app.get('/organization/:domain', isAuthenticated, organization.findOne);

    app.get('/organization/:domain/questions', isAuthenticated, question.findAll);

    app.post('/organization/:domain/question/create', isAuthenticated, question.create);
}
