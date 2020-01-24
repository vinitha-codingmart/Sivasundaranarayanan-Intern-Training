'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define('Answers', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(1000)
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
  }, {
    timestamps: false
  });

  Answers.associate = models => {
    Answers.belongsTo(models.Questions);
    Answers.belongsTo(models.Users);
    Answers.hasMany(models.Upvotes);
    Answers.hasMany(models.Comments);
  };

  return Answers;
};
