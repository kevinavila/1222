'use strict';

exports.get = function(req, res) {
	res.render('join', {layout: 'main', footer: 'footer fixed'});
};

exports.validateAccessCode = function(req, res) {
	res.render('agreements', {layout: 'main', footer: 'footer fixed'});
};