'use strict';

module.exports = function(app) {
  // Home
  app.route('/').get(function(req, res) {
    res.render('join', {layout: 'main'});
  })
};