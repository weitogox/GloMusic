$(document).ready(function () {

    var e = document.getElementById("mySelect");
    function changeSelect() {
      var value = e.options[e.selectedIndex].value;
      var text = e.options[e.selectedIndex].text;
      console.log(value, text);
    }
    e.changeSelect = changeSelect;
    changeSelect();

    
    var key = 'AIzaSyA6xlUF0FtbzrUKS6OYzX55MztZb8nnP6E';
    let playlistId = $('select#mySelect option:selected').val();
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 25,
        playlistId: playlistId
    }

    $(e).on('change', function(changed){
        options.playlistId = this.value;
        console.log(options)
        loadVids(URL, options);
    })

    loadVids(URL, options);

    function loadVids(apiendpoint, specs) {
        $.getJSON(apiendpoint, specs, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            resultsLoop(data);
        });
    }

		
    function resultsLoop(data) {
        $('main').find('article').remove();

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('main').append(`
            <article id="vidContainer" class="item" data-key="${vid}">

                <img src="${thumb}" alt="" class="thumb">
                <div class="details">
                    <h4 id="youtubeTitle">${title}</h4>
                    <h6 id="YoutubeDesc">${desc}</h6>
                    <button id="youtubeButton" onclick="window.open('https://www.youtube.com/watch?v=${vid}')";>YouTube</button>
                </div>

            </article>
            `);
        });
    }
    

});

var elements = document.getElementsByClassName("item");

function listView() {
    document.getElementById("mainView").style.display = "block";
}

function gridView() {
    document.getElementById("mainView").style.display = "inline-grid";
    document.getElementById("mainView").style.gridTemplateColumns = "repeat(2, 1fr)";
    document.getElementById("mainView").style.minWidth="1200px";
    document.getElementById("mainView").style.maxWidth="2000px";
    document.getElementById("mainView").style.justifyContent="center";
}