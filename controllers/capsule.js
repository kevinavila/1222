'use strict';

exports.get = function(req, res) {
  res.render('capsule', {layout: 'main'});
};