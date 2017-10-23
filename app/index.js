const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const path = require('path');

//Setting up views & template engine
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
});
