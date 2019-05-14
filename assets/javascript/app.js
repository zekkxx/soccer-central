 //-------------------------QUARY PARAMETERS-------------------------------------------------

 function searchVideoId(q) {
  var API_KEY = "AIzaSyDHcMkWIi06ah4VlEbBCTCiGVSQjD9nH-s";
  var q = q;
  var part = "snippet"; //specifies a comma-separated list of one or more channel resource properties that the API response will include.
  var type = "video";
  var baseURL = "https://www.googleapis.com/youtube/v3/search"; //
  var queryURL = baseURL + "?" + "part=" + part + "&q=" + q + "&type=" + type + "&key=" + API_KEY;
  $.ajax({
      url: queryURL, //---------------call to the youtube API------------------------------
      method: "GET"
  }).then(function (response) {
      console.log(response);
  })
}

//-------------------------AJAX CALL----------------------------------------------------------

searchVideoId("brfootball"); //------Return search results from Bleacher Report Football------
