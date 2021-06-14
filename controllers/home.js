'use strict';

var contentful = require('../services/contentful');
var join       = require('./join');
var capsule    = require('./capsule');

exports.get = function(req, res) {
	// Retrieve pages from Contentful
	contentful.getEntries('page').then(function (entries) {
		var pages = entries.map(entry => entry.fields)
		var homePages = pages.filter(page => { return page.homePage })
		var homePage = homePages ? homePages[0].title : ''

		// Return controller for home page. If no home page specified default to Capsule.
		switch (homePage.toUpperCase()) {
		  case 'JOIN':
		    return join.get(req, res)
		  case 'CAPSULE':
		    return capsule.get(req, res)
		  default:
		  	return capsule.get(req, res)
		}
	});
};