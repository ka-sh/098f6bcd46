/**
 * Setting up passport local Strategy
 */
const User = require('../models/User');
const LocalStrategy = require('passport-local')
    .Strategy;
const passport = require('passport');
const utils = require('./utils.js');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.find({
                where: {
                    username: username
                }
            })
            .then(function resolved(user) {
                if (user == null) {
                    return done(null, false, {
                        msg: 'Invalid Username or password.'
                    });
                } else if (isValidPassword(password, user.get('password'))) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        msg: 'Invalid Username or password.'
                    });
                }

            }, function onReject(reason) {
                console.log('Unknown users', reason);
                return done(null, false, {
                    msg: 'Invalid Username or password.'
                });
            });
    }
));

passport.serializeUser(function(user, done) {
    console.log("==>>>serializeUser");
    done(null, user.get('id'));
});

passport.deserializeUser(function(id, done) {
    console.log("===>>Finxing User by ID");
    User.find({
            where: {
                id: id
            }
        })
        .then(function(user) {
            done(null, user);
        });
});
/**
 * Compare password text with hash
 */
function isValidPassword(passwordText, hashedPassword) {
    return utils.compareHash(passwordText, hashedPassword);
}

module.exports = passport;
