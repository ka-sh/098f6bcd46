const bcrypt = require('bcryptjs');
const dataGen = require('./mockDataGen');
const Results = require('../models/Results');
const User = require('../models/User.js');
const uuid = require('uuid');

module.exports = (function() {
  const hash = function(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  return {
    compareHash: function(text, hash) {
      return bcrypt.compareSync(text, hash);
    },
    hash: hash,
    genFakeData: function() {
      const user = User.findOrCreate({
        where: {
          username: "test"
        },
        defaults: {
          password: hash('test'),
          clientId: uuid()
        }
      });

      Results.findOrCreate({
        where: {
          userId: user.get('id')
        },
        defaults: {
          results: {
            "AA": "98",
            "BB": "87",
            "AD": "91"
          },
        }
      });
    }
  };
})();
