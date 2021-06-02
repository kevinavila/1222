'use strict';

var contentful = require('../services/contentful')

exports.get = function(req, res) {
	var partyId = req.params.id

	contentful.getEntry(partyId).then(function (partyEntry) {
		var party = partyEntry.fields

		// Construct location map image URL
		party.locationMapImage = 'https:' + party.locationMapImage.fields.file.url

		res.render('party', { layout: 'main', footer: 'footer fixed', party: party })
    })
};

exports.parties = function(req, res) {
	var accessCode = req.query.code

	// Query for party entries
	contentful.getEntries('party').then(function (partyEntries) {
		var party = null

		// Find a party entry that has the access code and is live
		partyEntries.forEach(function (partyEntry) {
			var partyFields = partyEntry.fields

			if (partyFields.accessCode == accessCode && partyFields.live) {
				party = partyFields
				party.id = partyEntry.sys.id
			}
		})

		// Construct response
		var response = {}
		response.success = false
		if (party) {
			response.success = true
			response.party = party
		}

		res.send(response)
    })
};