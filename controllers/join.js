'use strict';

exports.get = function(req, res) {
	res.render('join', {layout: 'main', footer: 'footer fixed'});
};