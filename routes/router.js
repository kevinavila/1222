'use strict';

module.exports = function(app) {
  var join    = require('../controllers/join');
  var party   = require('../controllers/party');
  var capsule = require('../controllers/capsule');

  // Home
  app.route('/').get(capsule.get);

  // Join
  app.route('/join').get(join.get);

  // Party
  app.route('/party/:id').get(party.get);
  app.route('/parties').get(party.parties);

  // Capsule
  app.route('/capsule').get(capsule.get);
};