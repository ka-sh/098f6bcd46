const Sequelize = require('sequelize');
const sequelize = require('./DB.js');
const utils = require('../utils.js');
const uuid = require('uuid');

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
User.sync().then(function resolve() {
  User.findOrCreate({
    where: {
      uname: "test"
    },
    defaults: {
      password: utils.hash('test'),
      clientId: uuid()
    }
  });
})
module.exports = User;
