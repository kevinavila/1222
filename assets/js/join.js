"use strict";


$("#access-code").keypress(function(event) {
	// If Enter key is pressed check the access code
    if (event.which == 13) {
    	console.log("Join")
    }
});