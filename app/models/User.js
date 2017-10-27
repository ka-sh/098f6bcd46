const Sequelize = require('sequelize');
const sequelize = require('./DB.js');
const utils = require('../utils');
const uuid = require('uuid');
const Results = require('./Results');

const User = sequelize.define('user', {
  clientId: {
    type: Sequelize.UUID
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
});
User.hasMany(Results, {
  as: 'results'
});

User.sync();

module.exports = User;
