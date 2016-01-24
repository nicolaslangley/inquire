/**
 * Created by jonathanarlauskas on 2016-01-23.
 */

window.Spotify = {

    config: {},
    BASE_URL: 'https://api.spotify.com/v1/',
    TOP_RESULT: 'hype',

    init: function(opt) {
        opt = opt || {};
        this.config.client_id = opt.client_id;
    },

    // Get a list of playlists based on input word from Clarifai
    //Example url: "https://api.spotify.com/v1/search?q="doom metal"&type=playlist"
    getPlaylist: function(callback) {

        var endpoint = this.BASE_URL + 'search?q="' +this.TOP_RESULT+'"&type=playlist';
        console.log(endpoint);
        this.getJSON( endpoint, callback );
    },

    // GET request to obtain playlist information
    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }
};

// Initialize the app's client_id
function runSpotify() {
    Spotify.init({
        client_id:'7b0c575678ee4c8c9487c525afc3d46f'
    });
};


function querySpotifyPlaylist() {
    var tags = JSON.parse(window.localStorage.getItem("tags"));
    console.log(tags);
    Spotify.TOP_RESULT = tags[0].value[0];
    Spotify.getPlaylist(function(response) {
        // Prints url for playlist of first item related to keyword search
        console.log(response.playlists.items[0].external_urls);
    });
}






