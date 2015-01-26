'use strict';

module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Answer.belongsTo(models.Question);
        Answer.belongsTo(models.User);
        Answer.belongsTo(models.Organization);
      }
    }
  });

  return Answer;
};