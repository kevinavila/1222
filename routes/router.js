'use strict';

module.exports = function(app) {
  var join    = require('../controllers/join');
  var capsule = require('../controllers/capsule');

  // Home
  app.route('/').get(join.get);

  // Join
  app.route('/join').get(join.get);
  app.route('/validateAccessCode').get(join.validateAccessCode);

  // Capsule
  app.route('/capsule').get(capsule.get);
};