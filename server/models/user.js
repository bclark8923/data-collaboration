'use strict';

var Sequelize = require('sequelize'),
    passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		username: {
		  	type: DataTypes.STRING,
		  	allowNull: false,
		  	unique: true
		},
		email: {
		  	type: DataTypes.STRING,
			allowNull: false
		},
		name: {
		  	type: DataTypes.STRING
		},
		hash: {
			type: DataTypes.STRING(1024),
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Question);
				User.hasMany(models.Comment);
				User.hasMany(models.Answer);
				User.hasMany(models.Tag);
				User.belongsToMany(models.Organization, { through: 'OrganizationsUsers'});
			}
		}
	});

	passportLocalSequelize.attachToUser(User, {
	    usernameField: 'username',
	    hashField: 'hash',
	    saltField: 'salt'
	});

	return User;
};