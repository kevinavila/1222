'use strict';

var contentful = require('../services/contentful')

exports.get = function(req, res) {
	var accessCode = req.params.accessCode

	contentful.getEntries('party').then(function (parties) {
        res.render('party', {layout: 'main', footer: 'footer fixed'})
    })
};