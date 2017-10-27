const Results = require('../models/Results');
const User = require('../models/User.js');
const utils = require('./index');
module.exports.init = function() {
  const user = User.findOrCreate({
    where: {
      username: "test"
    },
    defaults: {
      password: utils.hash('test'),
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
