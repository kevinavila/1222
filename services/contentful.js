var contentful = require('contentful');

let client = null;

/**
 * Initializes Contentful client
 */
module.exports.init = function() {
    client = contentful.createClient({
        space: '264bb8lyo5tg',
        accessToken: 'AB9ulwVyOAfujvAB7rYJPnZ6W7xXTumsRt3RNHWs49I'
    });
};

/**
 * Gets all assets
 *
 * @returns {Array<String>} - array of image URLs
 */
module.exports.getImages = function() {
    return client.getAssets().then(function (assets) {
        // Construct array of URLs
        var imageUrls = assets.items.map(function(asset) {
            var url = 'https:' + asset.fields.file.url;

            return url;
        });

        return imageUrls;
    })
    .catch(function (e) {
        console.log(e);
    });
};

/**
 * Gets entries
 *
 * @returns {Array<Obj>} - array of entries
 */
module.exports.getEntries = function(contentType) {
    var query = {
        content_type: contentType
    }

    return client.getEntries(query).then(function (response) {
        return response.items
    })
    .catch(function (e) {
        console.log(e);
    });
};