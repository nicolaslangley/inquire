function makeFacebookPhotoURL( id, accessToken ) {
    return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
}

function login( callback ) {
    FB.login(function(response) {
        if (response.authResponse) {
            //console.log('Welcome!  Fetching your information.... ');
            if (callback) {
                callback(response);
            }
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    },{scope: 'user_photos'} );
}

function getAlbums( callback ) {
    FB.api(
        '/me/albums',
        {fields: 'id,cover_photo'},
        function(albumResponse) {
            //console.log( ' got albums ' );
            if (callback) {
                callback(albumResponse);
            }
        }
    );
}

function getPhotosForAlbumId( albumId, callback ) {
    FB.api(
        '/'+albumId+'/photos',
        {fields: 'id'},
        function(albumPhotosResponse) {
            //console.log( ' got photos for album ' + albumId );
            if (callback) {
                callback( albumId, albumPhotosResponse );
            }
        }
    );
}

function getLikesForPhotoId( photoId, callback ) {
    FB.api(
        '/'+albumId+'/photos/'+photoId+'/likes',
        {},
        function(photoLikesResponse) {
            if (callback) {
                callback( photoId, photoLikesResponse );
            }
        }
    );
}

function getPhotos(callback) {
    var allPhotos = [];
    var accessToken = '';
    login(function(loginResponse) {
        accessToken = loginResponse.authResponse.accessToken || '';
        getAlbums(function(albumResponse) {
            var i, album, deferreds = {}, listOfDeferreds = [];
            for (i = 0; i < albumResponse.data.length; i++) {
                album = albumResponse.data[i];
                deferreds[album.id] = $.Deferred();
                listOfDeferreds.push( deferreds[album.id] );
                getPhotosForAlbumId( album.id, function( albumId, albumPhotosResponse ) {
                    var i, facebookPhoto;
                    for (i = 0; i < albumPhotosResponse.data.length; i++) {
                        facebookPhoto = albumPhotosResponse.data[i];
                        allPhotos.push({
                            'id'	:	facebookPhoto.id,
                            'added'	:	facebookPhoto.created_time,
                            'url'	:	makeFacebookPhotoURL( facebookPhoto.id, accessToken )
                        });
                    }
                    deferreds[albumId].resolve();
                });
            }
            $.when.apply($, listOfDeferreds ).then( function() {
                if (callback) {
                    callback( allPhotos );
                }
            }, function( error ) {
                if (callback) {
                    callback( allPhotos, error );
                }
            });
        });
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log('Connected to Facebook!');
        if (typeof getPhotos != undefined) {
            getPhotos(function( photos ) {
                console.log( photos );
            });
        }
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me/albums', function(response) {
        console.log(response);
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}


// Facebook SDK Init
window.fbAsyncInit = function() {
    FB.init({
        appId      : '776739422456980',
        xfbml      : true,
        version    : 'v2.5'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};
    
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

