const Sequelize = require('sequelize');
const sequelize = require('./DB.js');
const utils = require('../services/utils');
const uuid = require('uuid');

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
User.sync()
    .then(function resolve() {
        User.findOrCreate({
            where: {
                username: "test"
            },
            defaults: {
                password: utils.hash('test'),
                clientId: uuid()
            }
        });
    })
module.exports = User;
