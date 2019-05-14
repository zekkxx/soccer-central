 //-------------------------QUARY PARAMETERS-------------------------------------------------

 function populateYouTube(searchTerm) {
  var API_KEY = "AIzaSyDHcMkWIi06ah4VlEbBCTCiGVSQjD9nH-s";
  var part = "snippet"; //specifies a comma-separated list of one or more channel resource properties that the API response will include.
  var type = "video";
  var baseURL = "https://www.googleapis.com/youtube/v3/search"; //
  var queryURL = baseURL + "?" + "part=" + part + "&q=" + searchTerm + "&type=" + type + "&key=" + API_KEY;
  $.ajax({
      url: queryURL, //---------------call to the youtube API------------------------------
      method: "GET"
  }).then(function (response) {
      console.log(response);
  })
}

