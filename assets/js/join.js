"use strict";

// Enter key is pressed on mobile
$('#access-code').keypress(function(event) {
    if (event.which == 13) {
        // Get access code
        var accessCode = $('#access-code').val()
        validateAccessCode(accessCode)
    }
})

// Enter key is pressed on desktop
$('#access-code-desktop').keypress(function(event) {
    if (event.which == 13) {
        // Get access code
        var accessCode = $('#access-code-desktop').val()
        validateAccessCode(accessCode)
    }
})

// Dynamically bind listener to agreement checkboxes
$('.join').on('change', 'input:checkbox', function() {
    updateNext()
})

// Validate access code, grab party, and display agreements
function validateAccessCode(accessCode) {
    if (accessCode) {
        $.get('/parties?code=' + accessCode, function(response) {
            if (response.success) {
                // Access code validated
                $("#logo").attr("src", "img/logo_pink.png")
                $(".join").fadeOut(500, function () {
                    $.get('/party/' + response.party.id, function(response) {
                        // Show agreements before party details
                        var partyHtml = $(response).find('.party')
                        $(".join").html(partyHtml)
                        $(".footer").removeClass("fixed")
                        $(".join").fadeIn(500)

                        // Make footer non-sticky
                        $(".join-footer").addClass("footer")
                        $(".join-footer").removeClass("join-footer")
                    })
                })
            } else {
                // No party with the entered access code was found
                $(".error").removeClass("hide")
            }
        })
    } else {
        // No access code error message
        $(".error").removeClass("hide")
    }
}

// Validate agreements have been accepted and show party page
function letsParty() {
    if (agreementsChecked()) {
        // Show party details
        $('.agreements').hide()
        $('.party-details').removeClass('hide')
    }
}

// Update next arrow based on agreement checkboxes
function updateNext() {
    if (agreementsChecked()) {
        $(".next").removeClass("disabled")
    } else {
        $(".next").addClass("disabled")
    }
}

// Check if agreement checkboxes are checked
function agreementsChecked() {
    var agreementsChecked            = false
    var agreementsCheckbox           = $('#agreements-checkbox')
    var agreementsCheckboxRespect    = $('#agreements-checkbox-respect')
    var agreementsCheckboxJourney    = $('#agreements-checkbox-journey')
    var agreementsCheckboxTrace      = $('#agreements-checkbox-trace')
    var agreementsCheckboxActions    = $('#agreements-checkbox-actions')
    var agreementsCheckboxPhotograph = $('#agreements-checkbox-photograph')

    if (agreementsCheckbox.is(":checked")) {
        // Mobile agreements checkbox is checked
        agreementsChecked = true
    } else if (agreementsCheckboxRespect.is(":checked") && agreementsCheckboxJourney.is(":checked") && agreementsCheckboxTrace.is(":checked") && agreementsCheckboxActions.is(":checked") && agreementsCheckboxPhotograph.is(":checked")) {
        // Desktop agreements checkboxes are checked
        agreementsChecked = true
    }

    return agreementsChecked
}
