'use strict';
const Hash = require('password-hash')

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      password: `${Hash.generate("John")}`,
      mail: 'johndoe@gmail.com'
    }, {
      name: 'Jennifer Davis',
      password: `${Hash.generate("Jennifer")}`,
      mail: 'jenniferdavis@gmail.com'
    }, {
      name: 'David Miller',
      password: `${Hash.generate("David")}`,
      mail: 'davidmiller@gmail.com'
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Users', null, {});

  }
};
