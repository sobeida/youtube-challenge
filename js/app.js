$(document).ready(function () {
    // STEP 1 - get the input from the user
    $("#search-form").submit(function (event) {
        event.preventDefault();
        getResults($("#query").val());
    });


    // STEP 2 - using the input from the user (query) make the API call to get the JSON response
    function getResults(query) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                "part": "snippet",
                "key": "AIzaSyAduu_MMzoXSlTWya1_23L43H2ntFGm9oE",
                "q": query,
                "type": "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
            },
            function (data) {
                // If there are no results it will just empty the list
                if (data.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                //if there are results, call the displaySearchResults
                displaySearchResults(data.items);
            }
        );
    }

    // STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videos) {

        var buildTheHtmlOutput = "";

        $.each(videos, function (index, video) {
            //concatenate the results inside the HTML variable
            buildTheHtmlOutput += "<li><p>" + video.snippet.title + "</p><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><img src='" + video.snippet.thumbnails.high.url + "'/></a></li>";
        });

        //use the HTML output to show it in the index.html
        $("#search-results ul").html(buildTheHtmlOutput);
    }
});
