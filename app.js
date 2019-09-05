import express from 'express';
var SpotifyWebApi = require('spotify-web-api-node');
var app = express();

var clientId = '68c10de2683f489f8a47bfe6c07bc52c',
clientSecret = '473c1922251f4a9d9b02fa9b21b3f054';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
clientId: clientId,
clientSecret: clientSecret
});




app.get('/:artist/:track', function (req, res) {
 
// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
 
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

    spotifyApi.searchTracks('track:' + req.params.track +'artist:'+ req.params.artist)
  .then(function(data) {
   
    res.send(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
});
   
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }  
);




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
