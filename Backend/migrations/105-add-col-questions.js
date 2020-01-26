'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Questions',
      'UserId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Questions', 'UserId')
  }
};