'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Upvotes', [{
      QuestionId: 1,
      UserId: 1,
      AnswerId: 0,
    }, {
      QuestionId: 0,
      UserId: 1,
      AnswerId: 1,
    },{
      QuestionId: 2,
      UserId: 2,
      AnswerId: 0,
    },{
      QuestionId: 1,
      UserId: 3,
      AnswerId: 0,
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Upvotes',null, {});

  }
};
