'use strict';

var models = require('../models');

exports.findAll = function(req, res) {
  res.status(200).json([{question: req.params.domain, id: "randomId"}]);
}

exports.create = function(req, res) {
  // add validation
  if(!req.body.question || req.body.question.trim() === '') {
      res.status(400).json({error: "Empty question"});
      return;
  }
  if(!req.params.domain || req.params.domain.trim() === '') {
      res.status(400).json({error: "Empty domain"});
      return;
  }

  models.sequelize.transaction(function(t) {
    // create new organization
    return models.Question.create({ 
      content: req.body.question
    }, {transaction: t}).then(function(question) {
      // associate the user and the organization
      return req.user.addQuestion(question, {transaction: t}).then(function(question) {
        return models.Organization.find({where: { domain: req.params.domain } }, {transaction: t}).then(function(org) {
          return org.addQuestion(question, {transaction: t}).then(function(result) {
            throw new Error();
            // return question;
          });
        });
      });
    });
  }).then(function(associatedUsers) {
    console.log('question created: ', associatedUsers);
    res.status(200).json(org.values);
  }).catch(function(err) {
    console.log('error while creating question: ', err); 
    res.status(400).json({error: err.toString()});
    return; 
  });
};