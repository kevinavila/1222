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