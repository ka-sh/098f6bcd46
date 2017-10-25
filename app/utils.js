const bcrypt = require('bcryptjs');

module.exports = (function() {
  return {
    hash: function(password) {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    },
    compareHash: function(text, hash) {
      return bcrypt.compareSync(text, hash);
    }
  };
})();
