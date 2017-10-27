const Sequelize = require('sequelize');
const sequelize = require('./DB.js');
const utils = require('../utils');
const uuid = require('uuid');

const Results = sequelize.define('results', {
  results: {
    type: Sequelize.JSON
  },
  sponsered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  sponsee: {
    type: Sequelize.STRING,
    allowNull: true
  },
});

Results.sync();
module.exports = Results;
