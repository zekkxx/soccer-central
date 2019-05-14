// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAZ9bhJ4yzdy4kYbUWljLT76OLafP4a7xA",
    authDomain: "project-1-cool-sporty-sports.firebaseapp.com",
    databaseURL: "https://project-1-cool-sporty-sports.firebaseio.com",
    projectId: "project-1-cool-sporty-sports",
    storageBucket: "project-1-cool-sporty-sports.appspot.com",
    messagingSenderId: "254833102956",
    appId: "1:254833102956:web:1ef7f40766bf5ccc"
};
// Initialize Firebase
var database;
var selectedLeagueID;
var selectedTeamID;
var selectedPlayerID;
var returnedAPIFootballContent

function newLeagueSelected(event){
    selectedLeagueID = event.target.value;
    populateTeams();
    //populateYouTube(event.target[event.target.selectedIndex].text);
    populateArticles(event.target[event.target.selectedIndex].text);
}

function newTeamSelected(event){
    console.log(event);
    //selectedTeamID = event.?
    populatePlayers();
    //populateYouTube(event.?.name);
    //populateArticles(event.?.name);
}

function newPlayerSelected(event){
    console.log(event);
    //selectedPlayerID = event.?
    populateInfo();
    //populateYouTube(event.?.name);
    //populateArticles(event.?.name);
}

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

function populateArticles(searchTerm) {
    console.log(searchTerm)
    var googleURL= "https://newsapi.org/v2/everything?q="+ searchTerm + "&apiKey=fb3aa28457e54aeb86cd1dc81bc99f6f"
        console.log(googleURL)

    $.ajax({
        url: googleURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        $(document).on("click",function() {
        for (let i = 0; i <response.articles.length;i++){
            var articleDiv = $("<div>");        
            var title = response.articles[i].title;
            var url = response.articles[i].url;
            var content = response.articles[i].content;
            var articleInfo = $("<img class='article'>");
            articleDiv.append(articleInfo);
            $("#articleContent").append(articleDiv);
            //making the title the link
            $('<a href="'+url +'"></a>').appendTo($('#articleContent'));
            var a = $('<a>');
            a.attr('href',url);
            a.text(title);
            $('#articleContent').append(a);
            $('#articleContent').append('<br>');
            $("#articleContent").append(content);
            console.log(response.articles.length=10)
            
            }
            })
        
        }
      
     
    )    
}

function newSearch(){ //Create a start point for searching our database
    $("#sideContent").empty();//empty #sideContent
    //var selectDiv = $("<div>");
    
    var newSelect = $("<select>");//create select
    database.ref().on("value", function(snapshot){
        //console.log(snapshot.val().Leagues.length);
        for(let i=0; i<snapshot.val().Leagues.length; i++){//make for loop to pull information from Leagues database
            var newOption = $("<option>");//create new option
            newOption.text(snapshot.val().Leagues[i].name + " - " + snapshot.val().Leagues[i].season);//assign new option name + year
            newOption.attr("value", snapshot.val().Leagues[i].leagueID);//assign new option value with leagueID
            newSelect.append(newOption);//append option to select
            //console.log("appended Option");
        }
    });
    newSelect.attr("id", "leagueSelect"); //give select uniqueID (#leagueSelect)
    newSelect.attr("class", "browser-default");
    //selectDiv.append(newSelect);
    $("#sideContent").append(newSelect);//append leagueSelect to #sideContent
    
    var idArray = ["teamSelectDiv", "playerSelectDiv", "playerInfoDiv"]; //create different Div names
    for(let i=0; i<idArray.length; i++){
        let newDiv = $("<div>");
        newDiv.attr("id", idArray[i]);
        $("#sideContent").append(newDiv); //apply to #sideContent
    }
}

function populateTeams(){ //Create new select for teams in given league
    //empty #teamSelect, #playerSelect, #playerInfo
    //create select
    //make for loop to pull information from Teams database
        //create new option
        //assign new option name
        //assign new option value with teamID
        //append option to select
    //give select uniqueID (#teamSelect)
    //append select to #teamSelectDiv
}

function populatePlayers(){
    //empty #playerSelect, #playerInfo
    //create select
    //AJAX API-Football and catch response in returnedAPIFootballContent
    //make for loop to pull information from returnedAPIFootballContent
        //create new option
        //assign new option name
        //assign new option value with (player id or index location?)
        //append option to select
    //give select uniqueID (#playerSelect)
    //append select to #playerSelectDiv
}

function populateInfo(){
    //empty #playerInfo
    //pull information from returnedAPIFootballContent
    //display information in #playerInfoDiv
}

$(function(){
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.slider').slider();
    $('.slider').slider("pause");
    newSearch();
    $(document).on("change", "#leagueSelect", newLeagueSelected);//onchange of #leagueSelect: newLeagueSelected
    //onchange of #teamSelect: newTeamSelected
    //onchange of #playerSelect: newPlayerSelected
});
