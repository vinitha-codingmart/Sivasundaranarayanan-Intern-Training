'use strict';
module.exports = (sequelize, DataTypes) => {

  const Questions = sequelize.define('Questions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(500)
    },
    reputations: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  Questions.associate = models => {
    Questions.hasMany(models.Tags);
    Questions.hasMany(models.Answers);
    Questions.belongsTo(models.Users);
    Questions.hasMany(models.Upvotes);
  };

  return Questions;
};