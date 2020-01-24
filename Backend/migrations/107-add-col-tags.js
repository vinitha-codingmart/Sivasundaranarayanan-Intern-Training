'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tags',
      'QuestionId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tags', 'QuestionId')
  }
};
