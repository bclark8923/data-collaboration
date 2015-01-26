'use strict';

module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    classMethods: {
      associate: function(models) {
        Organization.belongsTo(models.User, {as: 'Owner', foreignKey: 'OwnerId'});
        Organization.belongsToMany(models.User, { through: 'OrganizationsUsers'});
        Organization.hasMany(models.Question);
      }
    }
  });

  return Organization;
};