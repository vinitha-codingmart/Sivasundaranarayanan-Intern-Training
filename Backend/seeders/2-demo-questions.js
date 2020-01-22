'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [{
      title: 'Extraction of file from stream in nodeJS',
      description: `I want to check the metadata like author name or key of the file before save file in local storage.
is there any way to extract metadata of file from a stream file without saving the file first in the local folder then using read stream extract metadata.
i am using fastify-multipart to read stream to save file in local storage.`,
      reputations: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1
    }, {
      title: 'How to Add, Delete new Columns in Sequelize CLI',
      description: `I've just started using Sequelize and Sequelize CLI
Since it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?
For example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?"`,
      reputations: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 3
    }, {
      title: 'Auto increment id with sequelize in MySQL',
      description: `However, if I manually set the id value, it works. It seems sequelize is trying to set a default value in the id field, instead setting an autoincrement integer. I have defined this field as autoIncrement in my database too.
How could I do this insertion? Do I have to set the id manually?`,
      reputations: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});

  }
};
