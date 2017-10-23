const express = require('express');
const hbs = require('express-hbs');
const app = express();
const path = require('path');

app.set('view engine', 'hbs');
//Setting up views & template engine
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/layouts/layout.hbs',
}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!')
});
