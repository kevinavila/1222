'use strict';

var contentful = require('../services/contentful');

exports.get = function(req, res) {
	contentful.getAssets('capsule').then(function (assets) {
		var imageUrls = []

		// Construct array of URLs
		if (assets.length > 0) {
			var capsuleImages = assets.map(asset => asset.fields)

			imageUrls = capsuleImages.map(function(capsuleImage) {
				var url = 'https:' + capsuleImage.file.url

				return url
			})
		}

		res.render('capsule', { layout: 'main', footer: 'footer', images: imageUrls })
	});
};