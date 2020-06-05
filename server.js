var express = require('express');
var exphbs     = require('express-handlebars');

var app  = express();
var port = process.env.PORT || 3000;

// Configure handlebars
var helpers = require('./helpers/helpers');
var hbs = exphbs.create({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: helpers
});

// Set view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

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