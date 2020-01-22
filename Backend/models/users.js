'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mail: {
      allowNull: false,
      type: DataTypes.STRING
    },
    activeToken: {
      type: DataTypes.STRING(200)
    }
  }, {
    timestamps: false
  });
  Users.associate = models => {
    Users.hasMany(models.Questions)
    Users.hasMany(models.Answers)
    Users.hasMany(models.Upvotes)
  };
  return Users;
};