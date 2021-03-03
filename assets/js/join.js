"use strict";

// If Enter key is pressed check the access code
$("#access-code").keypress(function(event) {
    if (event.which == 13) {
        // Get access code
        var accessCode = $('#access-code').val()
        if (!accessCode) {
            accessCode = $('#access-code-desktop').val()
        }

        $(".join").fadeOut(500, function () {
            var partyUrl = '/party/' + accessCode
            $.get(partyUrl, function(response) {
                // Show agreements before party details
                var partyHtml = $(response).find('.party')
                $(".join").html(partyHtml)
                $(".footer").removeClass("fixed")
                $(".join").fadeIn(500)
            })
        })
    }
});

// Validate agreements have been accepted and show party page
function letsParty() {
    var agreementsCheckbox = $('#agreements-checkbox')

    if (agreementsCheckbox.is(":checked")) {
        // Agreements checkbox is checked, show party details
        $('.agreements').hide()
    }
}