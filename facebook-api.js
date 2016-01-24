function setupFacebookSDK() {
    // Facebook SDK Init
    window.fbAsyncInit = function () {
        FB.init({
            appId: '776739422456980',
            xfbml: true,
            version: 'v2.5'
        });

        if (typeof getPhotos != undefined) {
            getPhotos(function (photos) {
                var $facebook = $( '#results' );
                var numOfImages = 20;
                for ( var i = 0; i < numOfImages; i++ ) {
                    imageUrl = photos[i].url;
                    $facebook.append( '<img class="img-500" src="' + imageUrl + '" />' );
                }
                console.log(photos);
                get_access_token(photos[0].url);
            });
        }
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
};

function moveToDisplay() {
    window.location.assign('http://localhost:63342/Inquire/display.html');
}
