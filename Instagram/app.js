window.Instagram = {
    /**
     * Store application settings
     */
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function( opt ) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
    },

    /**
     * Get the most recent media published by the owner of the access_token.
     * https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN
     */
     
    popular: function(callback) {
        var endpoint = this.BASE_URL + 'users/self/media/recent?access_token=' + this.config.access_token;
        this.getJSON( endpoint, callback );
    },

    /**
     * Get the list of recent media liked by the owner of the access_token.
     * https://api.instagram.com/v1/users/self/media/liked?access_token=ACCESS-TOKEN
     */
    tagsByName: function(callback) {
        var endpoint = this.BASE_URL + '/users/self/media/liked?access_token=' + this.config.access_token;
        this.getJSON( endpoint, callback );
    },

    authenticate: function(){
    	var client_id = this.config.client_id;
    	var redirect_uri = 'http://nicolaslangley.github.io/inquire';
    	window.open('https://api.instagram.com/oauth/authorize/?client_id='+ client_id +'&redirect_uri=' + redirect_uri + '&response_type=token');

    },

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

Instagram.init({
	client_id:'a6d19f6db6424e3889b4a039dc32e93e'
});
Instagram.authenticate();



$( document ).ready(function() {

    Instagram.popular(function( response ) {
        var $instagram = $( '#instagram' );
        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append( '<img src="' + imageUrl + '" />' );
        }
    });

    $( '#form' ).on('submit', function( e ) {
        e.preventDefault();

        var tagName = $( '#search' ).val();
        Instagram.tagsByName(tagName, function( response ) {
            var $instagram = $( '#instagram' );
                $instagram.html('');

            for ( var i = 0; i < response.data.length; i++ ) {
                imageUrl = response.data[i].images.low_resolution.url;
                $instagram.append( '<img src="' + imageUrl + '" />' );
            }
        });

    });

});