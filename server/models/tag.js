'use strict';

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsTo(models.Question);
        Tag.belongsTo(models.Organization);
        Tag.belongsTo(models.User);
      }
    }
  });

  return Tag;
};