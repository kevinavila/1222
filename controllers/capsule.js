'use strict';

var contentful = require('../services/contentful');

exports.get = function(req, res) {
	contentful.getEntries('capsuleImage').then(function (entries) {
		var imageUrls = []

		// Construct array of URLs
		if (entries.length > 0) {
			var capsuleImages = entries.map(entry => entry.fields)

			imageUrls = capsuleImages.map(function(capsuleImage) {
				var url = 'https:' + capsuleImage.image.fields.file.url

				return url
			})
		}

		res.render('capsule', { layout: 'main', footer: 'footer', images: imageUrls })
	});
};