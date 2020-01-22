'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Answers', [{
      content: 'If you are using sequelize-cli you need to create the migration first. This is just a file that tells the engine how to update the database and how to roll back the changes in case something goes wrong. You should always commit this file to your repository',
      reputations: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2,
      QuestionId: 2
    }, {
      content: `You must be sure you're not even sending the id key at all.
I have done a quick minimal test and it seemed to work great`,
      reputations: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      QuestionId: 3
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
