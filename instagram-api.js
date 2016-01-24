
window.Instagram = {
    // Store app settings
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function( opt ) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
    },

    //Get the most recent media published by the owner of the access_token.
    //https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN
    recentMedia: function(callback) {
        var endpoint = this.BASE_URL + '/users/self/media/recent?access_token=' + this.config.access_token;
        console.log(endpoint);
        console.log(this.config.access_token);
        this.getJSON( endpoint, callback );
    },

    //Get the list of recent media liked by the owner of the access_token.
    //https://api.instagram.com/v1/users/self/media/liked?access_token=ACCESS-TOKEN
    likedMedia: function(callback) {
        var endpoint = this.BASE_URL + '/users/self/media/liked?access_token=' + this.config.access_token;
        this.getJSON( endpoint, callback );
    },

    //Display the authentication screen
    authenticate: function(){
    	var client_id = this.config.client_id;
    	var redirect_uri = 'http://nicolaslangley.github.io/inquire/display.html';
    	window.location.assign('https://api.instagram.com/oauth/authorize/?client_id='+ client_id +'&redirect_uri=' + redirect_uri + '&response_type=token');

    },

    // GET request to obtain photo information
    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }
};

// Initialize the app's client_id
function setupInstagram() {
    Instagram.init({
        client_id:'a6d19f6db6424e3889b4a039dc32e93e'
    });
    Instagram.authenticate();
};

// Set up access_token for GET request urls
var accTok = window.location.hash.substr(1);
var tokArray = accTok.split('=');

if (tokArray.indexOf("error") == -1 && tokArray.indexOf("access_token") != -1){
    Instagram.config.access_token = tokArray[1];
    console.log('Instagram authenticated successfully!');
    Instagram.recentMedia(function( response ) {
        var $instagram = $( '#results' );
        var numOfImages = response.data.length;
        window.global_count = numOfImages;
        for ( var i = 0; i < numOfImages; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            get_access_token(imageUrl);
            $instagram.append( '<img class="img-500" src="' + imageUrl + '" />' );
        }
    });
} else {
    console.log(accTok);
    setupFacebookSDK();
}
