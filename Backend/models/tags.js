'use strict';
module.exports = (sequelize, DataTypes) => {

  const Tags = sequelize.define('Tags', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    tag: {
      allowNull: false,
      type: DataTypes.STRING
    },
    QuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'id'
      }
    }
  }, { timestamps: false });


  Tags.associate = models => {
    Tags.belongsToMany(models.Questions, { through: 'QuestionTag' });
  };


  return Tags;
};