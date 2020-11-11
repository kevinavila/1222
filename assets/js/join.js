"use strict";

// If Enter key is pressed check the access code
$("#access-code").keypress(function(event) {
    if (event.which == 13) {
    	// Show Agreements
    	$(".join").fadeOut(500, function () {
    		$.get('/validateAccessCode', function(response) {
	    		var agreementsHtml = $(response).find('.agreements');
	    		$(".join").html(agreementsHtml)
	    		$(".footer").removeClass("fixed")
	    		$(".join").fadeIn(500)
	    	});
    	});
    } else {
    	// Incorrect access code
    }
});