'use strict';

exports.row = function(items, numColumns, options) {
  var result = '';

  for (var i = 0; i < items.length; i += numColumns) {
    result += options.fn({
        columns: items.slice(i, i + numColumns)
    });
  }

  return result;
};