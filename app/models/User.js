const Sequelize = require('sequelize');
const sequelize = require('./DB.js');
const User = sequelize.define('user', {
  clientId: {
    type: Sequelize.UUID
  },
  uname: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
});

module.exports = User;
