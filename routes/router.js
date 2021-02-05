'use strict';

module.exports = function(app) {
  var join    = require('../controllers/join');
  var party   = require('../controllers/party');
  var capsule = require('../controllers/capsule');

  // Home
  app.route('/').get(join.get);

  // Join
  app.route('/join').get(join.get);

  // Party
  app.route('/party/:accessCode').get(party.get);

  // Capsule
  app.route('/capsule').get(capsule.get);
};