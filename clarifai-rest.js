var get_tags = function (url, access_token) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.clarifai.com/v1/tag/', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.onload = function () {
        var json = JSON.parse(this.responseText);
        console.log(json.results[0].result.tag.classes);
    };
    var args = 'url='+encodeURIComponent(url);
    xhr.send(args);
};

var get_access_token = function (url) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.clarifai.com/v1/token/', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
      console.log(this.responseText);
      var json = JSON.parse(this.responseText);
      get_tags(url, json.access_token);
  };
  var client_id = '2pQ-VC_WShPuIXrCAL0iRGkFivooTFPxGG4E_sAb';
  var client_secret = 'YFLB3wd2H6BI3qSj0hj-EXltsZFvobwash5v4lmr';
  var args = 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret;
  xhr.send(args);
};

var url = 'http://www.clarifai.com/img/metro-north.jpg';
if (typeof getPhotos != undefined) {
    getPhotos(function( photos ) {
        console.log( photos );
        get_access_token(photos.url);
    });
}


