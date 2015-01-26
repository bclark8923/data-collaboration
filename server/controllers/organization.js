'use strict';

var models = require('../models');

exports.create = function(req, res) {
  // add validation
  if(!req.body.name || req.body.name.trim() === '') {
      res.status(400).json({error: "Empty name"});
      return;
  }
  if(!req.body.domain || req.body.domain.trim() === '') {
      res.status(400).json({error: "Empty domain"});
      return;
  }

  models.sequelize.transaction(function(t) {
    // create new organization
    return models.Organization
      .create({ 
        name: req.body.name, 
        domain: req.body.domain 
      }, {transaction: t})
      .then(function(org) {
        // Add the current user as a member
        return org.addUser(req.user, {transaction: t}).then(function(results) {
          // Set the current user as the owner
          return org.setOwner(req.user, {transaction: t}).then(function(results) {
            // return the organization object from the transaction
            return org;
          });
        });
      });
  }).then(function(result) {
    console.log('organization created: ', result);
    res.status(200).json(result.values);
  }).catch(function(err) {
    console.log('error while creating organization: ', err); 
    res.status(403).json({error: err.toString()});
    return; 
  });
};

exports.findOne = function(req, res) {
  // console.log(models);
  res.send(req.params.domain);
}