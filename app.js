var topicsArray = ["Shiba Inu", "Wightlifting Fails", "Hangzhou", "Travel", "Germany"];

$(document).ready(function() {
    for (var i = 0; i < topicsArray.length; i++) {
        $("#dynamic-buttons").append("<button type='button' onclick='searchGif(\"" + topicsArray[i] + "\")' class='btn' value=' " + topicsArray[i] + "'> " + topicsArray[i] + " </button>");
    }
});

function topicsButtonClicked() {
    var userInput = $('#shibaInu-input').val().trim();
    searchGif(userInput);
}

$("#addCategories").on("click", function(event) {
    event.preventDefault();
    var userInput = $('#shibaInu-input').val().trim();
    
    if (userInput) {
        $('#dynamic-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn' value=' " + userInput + "'> " + userInput + " </button>");
        $("#shibaInu-input").empty();
    }
})

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=eef77c4daea7452cbe797bbf75c6088a&limit=10&rating=R',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#shiba-Inu').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#shiba-Inu').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}