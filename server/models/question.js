'use strict';

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    classMethods: {
      associate: function(models) {
        Question.belongsTo(models.User);
        Question.belongsTo(models.Organization);
        Question.hasMany(models.Comment);
        Question.hasMany(models.Answer);
        Question.hasMany(models.Tag);
      }
    }
  });

  return Question;
};