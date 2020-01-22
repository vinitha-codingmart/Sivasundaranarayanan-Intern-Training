'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Answers',
          'UserId', {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        }),
        queryInterface.addColumn(
          'Answers',
          'QuestionId', {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Questions',
            key: 'id'
          }
        })
      ])
    }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Answers', 'UserId'),
        queryInterface.removeColumn('Answers', 'QuestionId')
      ])
    })
  }
};
