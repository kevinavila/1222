"use strict";

// Enter key is pressed on mobile
$('#access-code').keypress(function(event) {
    if (event.which == 13) {
        validateAccessCode()
    }
})

// Enter key is pressed on desktop
$('#access-code-desktop').keypress(function(event) {
    if (event.which == 13) {
        validateAccessCode()
    }
})

// Access code input changed on mobile
$('#access-code').on('input', function() {
    if ($('#access-code').val().length > 0) {
        $('.next').show()
    } else {
        $('.next').hide()
    }
})

// Dynamically bind listener to agreement checkboxes
$('.join').on('change', 'input:checkbox', function() {
    updateNext()
})

// Validate access code, grab party, and display agreements
function validateAccessCode(accessCode) {
    var accessCode = $('#access-code').val()
    if (!accessCode) {
        accessCode = $('#access-code-desktop').val()
    }

    if (accessCode) {
        $.get('/parties?code=' + accessCode, function(response) {
            if (response.success) {
                // Access code validated
                // Hide footer
                $("#footer").hide()

                $("#logo").attr("src", "img/logo_pink.png")
                $(".join").fadeOut(500, function () {
                    $.get('/party/' + response.party.id, function(response) {
                        // Show agreements before party details
                        var partyHtml = $(response).find('.party')
                        $(".join").html(partyHtml)
                        $(".footer").removeClass("fixed")
                        $(".join").fadeIn(500)

                        // Show non-sticky footer
                        $("#footer").addClass("footer")
                        $("#footer").removeClass("join-footer")
                        $("#footer").show()
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
        $(window).scrollTop(0)
    }
}

// Check if agreement checkboxes are checked and update next arrow
function updateNext() {
    if (agreementsChecked()) {
        $(".next").removeClass("disabled")
    } else {
        $(".next").addClass("disabled")
    }
}

// Check if agreement checkboxes are checked
function agreementsChecked() {
    return $('#agreements-checkbox-mobile').is(":checked") || $('#agreements-checkbox-desktop').is(":checked")
}
