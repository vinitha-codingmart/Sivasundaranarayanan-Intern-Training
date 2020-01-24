'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Comments',
          'UserId', {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        })
      ],
      queryInterface.addColumn(
        'Comments',
        'AnswerId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Answers',
          key: 'id'
        }
      }))
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Comments', 'UserId'),
        queryInterface.removeColumn('Comments', 'AnswerId')
      ])
    })
  }
};
