var express = require('express');
var hbs     = require('express-handlebars');

var app  = express();
var port = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// Initialize Contentful client
var contentful = require('./services/contentful');
contentful.init();

// Set up router
var router = require('./routes/router');
router(app);

// Set assets path
app.use(express.static(__dirname + "/dist"));

console.log('Listening on port ' + port);
app.listen(port);