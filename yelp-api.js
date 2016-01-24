function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        oauthYelp();
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
}

function oauthYelp() {
    var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey : "JMWAu4KSVJsrBHtkkkBayA",
        consumerSecret : "ZZLiXntYDW-l7U3c1y8gMDD06so",
        accessToken : "w59WVRl7l3OZKT2phG5mO9NBcIRjXljK",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "Fj7gjAxfkprTKQ1ghYactJ3o-eQ",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };

    var terms = 'food';
    var near = 'San+Francisco';

    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    console.log(parameterMap);

    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
            console.log(data);
            //$("body").append(output);
        }
    });
}

function authenticateYelp() {
    var oauth = OAuth({
        consumer: {
            public: 'JMWAu4KSVJsrBHtkkkBayA',
            secret: 'ZZLiXntYDW-l7U3c1y8gMDD06so'
        },
        signature_method: 'HMAC-SHA1'
    });

    var request_data = {
        url: 'https://api.yelp.com/v2/search?term=food&location=San+Francisco',
        method: 'POST',
        data: {
            status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
        }
    };
    var token = {
        public: 'w59WVRl7l3OZKT2phG5mO9NBcIRjXljK',
        secret: 'Fj7gjAxfkprTKQ1ghYactJ3o-eQ'
    };

    $.ajax({
        url: request_data.url,
        type: request_data.method,
        data: oauth.authorize(request_data, token)
    }).done(function(data) {
        console.log(data);
    });

}

function moveToRecommendations() {
    window.location.assign('http://localhost:63342/Inquire/recommendations.html');
}

$(document).ready(function() {
    getLocation();
});