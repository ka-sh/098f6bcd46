const express = require('express');
const router = express.Router();
const passport = require('../services/passport.js');

router.get('/', function(req, res) {
    res.render('login');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/home',
        failureFlash: true
    }),
    function(req, res) {
        res.render('home');
    });

router.get('/home', ensureAuthenticated,
    function(req, res) {
        res.render('home');
    });


function ensureAuthenticated(req, res, next) {
    console.log("Ensuring Authenticated....");
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}
module.exports = router;
