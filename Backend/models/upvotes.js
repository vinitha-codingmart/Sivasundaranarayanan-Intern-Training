'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvotes = sequelize.define('Upvotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    QuestionId: {
      type: DataTypes.INTEGER
    },
    AnswerId: {
      type: DataTypes.INTEGER
    }
  }, { timestamps: false });

  Upvotes.associate = function (models) {
    Upvotes.belongsTo(models.Users);
    Upvotes.belongsTo(models.Questions);
    Upvotes.belongsTo(models.Answers);
  };
  return Upvotes;
};