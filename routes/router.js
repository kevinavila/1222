'use strict';

module.exports = function(app) {
  var join    = require('../controllers/join');
  var capsule = require('../controllers/capsule');

  // Home
  app.route('/').get(join.get);

  // Join
  app.route('/join').get(join.get);

  // Capsul
  app.route('/capsule').get(capsule.get);
};