const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const utils = require('./utils.js');

app.use(cookieParser());


//Setting up views & template engine
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname +
  '/bower_components'));

app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Setting up parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//
// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



//Routes
app.get('/', function(req, res) {
  res.render('login');
});
/**
 * Handling login
 */
app.post('/login', function(req, res) {
  req.checkBody('uname', 'user name is required.!!').notEmpty();
  req.checkBody('password', 'Password is required.!!').notEmpty();
  if (req.validationErrors()) {
    res.render('login', {
      errors: req.validationErrors()
    });
  } else {
    User.find({
      where: {
        uname: req.body.uname
      }
    }).then(function(user) {
      if (isValidPassword(req.body.password, user.get('password'))) {
        res.render('home');
      } else {
        res.render('login', {
          errors: [{
            msg: "Invalid Password"
          }]
        });
      }
    });
  }
});


app.listen(8080, function() {
  console.log('Example app listening on port 8080!')
});

function isValidPassword(passwordText, hashedPassword) {
  return utils.compareHash(passwordText, hashedPassword);
}
