'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Tags', [{
      Tag: 'node.js',
      QuestionId: 1
    }, {
      Tag: 'stream',
      QuestionId: 1
    }, {
      Tag: 'node.js',
      QuestionId: 2
    }, {
      Tag: 'sequelize.js',
      QuestionId: 2
    }, {
      Tag: 'psql',
      QuestionId: 2
    }, {
      Tag: 'sequelize-cli',
      QuestionId: 2
    }, {
      Tag: 'mysql',
      QuestionId: 3
    }, {
      Tag: 'node.js',
      QuestionId: 3
    }, {
      Tag: 'sequelize.js',
      QuestionId: 3
    }, {
      Tag: 'java',
      QuestionId: 4
    }, {
      Tag: 'android',
      QuestionId: 4
    }, {
      Tag: 'android-studio',
      QuestionId: 4
    }, {
      Tag: 'kotlin',
      QuestionId: 4
    }, {
      Tag: 'nodejs',
      QuestionId: 5
    }, {
      Tag: 'express',
      QuestionId: 5
    }, {
      Tag: 'swagger',
      QuestionId: 5
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Tags', null, {});

  }
};
