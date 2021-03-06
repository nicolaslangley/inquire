function showModal(element) {
    var src = element.src;
    console.log(src);
    console.log($(this));
    var img = '<img src="' + src + '" class="img-responsive"/>';
    $('#myModal').modal();
    $('#myModal').on('shown.bs.modal', function(){
        $('#myModal .modal-body').html(img);
    });
    $('#myModal').on('hidden.bs.modal', function(){
        $('#myModal .modal-body').html('');
    });
}


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
                window.global_count = numOfImages;
                for ( var i = 0; i < numOfImages; i++ ) {
                    imageUrl = photos[i].url;
					get_access_token(imageUrl);
                    $facebook.append( '<img class="img-500" onclick="showModal(this)" src="' + imageUrl + '" />' );
                }
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
    window.location.assign('http://nicolaslangley.github.io/inquire/display.html');
}
