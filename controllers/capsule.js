'use strict';

var contentful = require('../services/contentful');

exports.get = function(req, res) {
    contentful.getImages().then(function (images) {
        res.render('capsule', {layout: 'main', footer: 'footer', images: images});
    });
};