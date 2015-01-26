'use strict';

var models = require('../models');

exports.loggedin = function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0'); 
};

exports.signup = function(req, res) {
  // add validation
  if(!req.body.username || req.body.username.trim() === '') {
      res.status(400).json({error: "Empty username"});
      return;
  }
  if(!req.body.name || req.body.name.trim() === '') {
      res.status(400).json({error: "Empty name"});
      return;
  }
  if(!req.body.password || req.body.password.trim() === '') {
      res.status(400).json({error: "Empty password"});
      return;
  }

  // Register new user);
  models.User.register({ username: req.body.username, name: req.body.name, email: req.body.username }, req.body.password, function(err) {
    if (err) { 
      console.log('error while user register!', err); 
      res.status(400).json({error: err.toString()});
      return; 
    }

    console.log('user registered!');

    res.status(200).json({message:"success"});
  });
};

exports.login = function(req, res) {
  var user = {
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    organizations: []
  }
  res.send(user);
};

exports.logout = function(req, res) {
  req.logOut(); 
  res.send(200); 
}