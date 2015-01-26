'use strict';

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
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
        Comment.belongsTo(models.Question);
        Comment.belongsTo(models.User);
      }
    }
  });

  return Comment;
};