/**
 * Created by jonathanarlauskas on 2016-01-23.
 */

window.Spotify = {

    config: {},
    BASE_URL: 'https://api.spotify.com/v1/',
    TOP_RESULT: 'hype',
    //CLIENT_ID: '7b0c575678ee4c8c9487c525afc3d46f',

    init: function(opt) {
        opt = opt || {};
        this.config.client_id = opt.client_id;
    },

    // Get a list of playlists based on input word from Clarifai
    //"https://api.spotify.com/v1/search?q="doom metal"&type=playlist"
    getPlaylist: function(callback) {

        var endpoint = this.BASE_URL + 'search?q="' +this.TOP_RESULT+'"&type=playlist';
        console.log(endpoint);
        this.getJSON( endpoint, callback );
    },

    // GET request to obtain photo information
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


    Spotify.getPlaylist(function(response) {
            console.log(response.playlists);
    });






