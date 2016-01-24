
window.Foursquare = {
    // Store app settings
    config: {},

    BASE_URL: 'https://api.foursquare.com/v2',

    init: function( opt ) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
    },

    searchVenues: function(query_term, callback) {
        console.log(this.config.longitude);
        var endpoint = this.BASE_URL + '/venues/search' +
                        '?ll='+ this.config.latitude+','+this.config.longitude+
                        '&query=' + query_term +
                        '&oauth_token='+ this.config.access_token +
                        '&v=20160123';
        console.log(endpoint);
        console.log(this.config.access_token);
        this.getJSON( endpoint, callback );
    },

    //Display the authentication screen
    authenticate: function(){
        console.log("Authenticating");
        var client_id = this.config.client_id;
        var redirect_uri = 'http://localhost:63342/Inquire/recommendations.html';
        //window.location.assign('https://foursquare.com/oauth2/authenticate/' +
        //                        '?client_id='+ client_id +
        //                        '&response_type=token' +
        //                        '&redirect_uri='+ redirect_uri);
        window.open('https://foursquare.com/oauth2/authenticate/' +
                                '?client_id='+ client_id +
                                '&response_type=token' +
                                '&redirect_uri='+ redirect_uri);
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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
    Foursquare.config.latitude = position.coords.latitude;
    Foursquare.config.longitude = position.coords.longitude;
    resultsCallback();
}

function resultsCallback() {
    console.log(window.localStorage.getItem("tags"));
    var tags = JSON.parse(window.localStorage.getItem("tags"));
    console.log(tags);
    Foursquare.searchVenues(tags[0].value[0], function(response) {
        console.log(response.response.venues);
        var numEntries = response.response.venues.length;
        for (var i = 0; i < numEntries; i++) {
            $('#row'+i).html("<td>"+ response.response.venues[i].name +"</td>");
            $('#results-inner-table').append('<tr id="row'+(i+1)+'"></tr>');
        }
        // Handle results..
    });
}

// Initialize the app's client_id
function setupFoursquare() {
    Foursquare.init({
        client_id:'ZTPNF1LSSGCI240CU1GAUTTLL2SHNZUQIDEUA0YQTDENICAK'
    });
    Foursquare.authenticate();
};

function handlePostAuthentication() {
    // Set up access_token for GET request urls
    var accTok = window.location.hash.substr(1);
    var tokArray = accTok.split('=');

    if (tokArray.indexOf("error") == -1 && tokArray.indexOf("access_token") != -1) {
        Foursquare.config.access_token = tokArray[1];
        console.log('Foursquare authenticated successfully!');
        getLocation();
    } else {
        console.log(accTok);
    }
}
