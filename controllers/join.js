'use strict';

exports.get = function(req, res) {
	res.render('join', {layout: 'main', footer: 'join-footer'})
}