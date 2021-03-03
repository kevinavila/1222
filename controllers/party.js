'use strict';

var contentful = require('../services/contentful')

exports.get = function(req, res) {
	var accessCode = req.params.accessCode

	contentful.getEntries('party').then(function (parties) {
		var party = parties.length > 0 ? parties[0].fields : null

		// If it's null return a invalid code page?
        res.render('party', { layout: 'main', footer: 'footer fixed', party: party })
    })
};