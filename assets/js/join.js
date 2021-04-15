"use strict";

// Enter key is pressed on mobile
$("#access-code").keypress(function(event) {
    if (event.which == 13) {
        // Get access code
        var accessCode = $('#access-code').val()
        validateAccessCode(accessCode)
    }
})

// Enter key is pressed on desktop
$("#access-code-desktop").keypress(function(event) {
    if (event.which == 13) {
        // Get access code
        var accessCode = $('#access-code-desktop').val()
        validateAccessCode(accessCode)
    }
})

// Validate access code, grab party, and display agreements
function validateAccessCode(accessCode) {
    if (accessCode) {
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
    } else {
        // No access code error message
    }
}

// Validate agreements have been accepted and show party page
function letsParty() {
    var agreementsCheckbox = $('#agreements-checkbox')

    if (agreementsCheckbox.is(":checked")) {
        // Agreements checkbox is checked, show party details
        $('.agreements').hide()
        $('.party-details').removeClass('hide')
    }
}