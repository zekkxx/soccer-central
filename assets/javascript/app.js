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
var selectedLeagueIndex;
var selectedTeamIndex;
var selectedPlayer;
var returnedAPIFootballContent;

function newLeagueSelected(event){
    //console.log(event.target.value);
    if(event.target.selectedIndex != 0){
        selectedLeagueIndex = event.target.selectedIndex - 1;
        populateTeams();
        populateYouTube(event.target[event.target.selectedIndex].text);
        populateArticles(event.target[event.target.selectedIndex].text);
    }
}

function newTeamSelected(event){
    //console.log(event.target.value);
    if(event.target.selectedIndex != 0){
        selectedTeamIndex = event.target.selectedIndex - 1;
        populatePlayers();
        populateYouTube(event.target[event.target.selectedIndex].text);
        populateArticles(event.target[event.target.selectedIndex].text);
    }
}

function newPlayerSelected(event){
    //console.log(event.target.value);
    if(event.target.selectedIndex != 0){
        selectedPlayerIndex = event.target.selectedIndex - 1;
        populateInfo();
        populateYouTube(event.target[event.target.selectedIndex].text);
        populateArticles(event.target[event.target.selectedIndex].text);
    }
}

 function populateYouTube(searchTerm) {
    $(".slider").empty();
    var API_KEY = "AIzaSyCBM3aFwX66OzVIcr7x7Pf-0n8xjD1BTI8";
    var part = "snippet"; //specifies a comma-separated list of one or more channel resource properties that the API response will include.
    var type = "video";
    var baseURL = "https://www.googleapis.com/youtube/v3/search"; //
    var queryURL = baseURL + "?" + "part=" + part + "&q=" + searchTerm + "&type=" + type + "&key=" + API_KEY;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        var sliderShow = $("<ul>");
        sliderShow.attr("class", "slides");
        for(let i=0; i<response.items.length; i++){
            var newItem = $("<li>");
            var newDiv = $("<div class='video-container'>");
            var newIFrame = $("<iFrame width='853' height='480' frameborder='0' allowfullscreen>")
            newIFrame.attr("src", "https://www.youtube.com/embed/"+response.items[i].id.videoId);
            //console.log(response.items[i].id.videoId);
            //console.log(newIFrame.attr("src"));
            newDiv.append(newIFrame);
            newItem.append(newDiv);
            sliderShow.append(newItem);
        }
        $(".slider").append(sliderShow);
        $('.slider').slider({interval:600000});
    })
}

function populateArticles(searchTerm) {
    $("#articleContentDiv").empty();
    //console.log(searchTerm)
    var googleURL= "https://newsapi.org/v2/everything?q="+ searchTerm + "&apiKey=fb3aa28457e54aeb86cd1dc81bc99f6f"
        //console.log(googleURL)
    
    $.ajax({
        url: googleURL,
        method: "GET"
    }).then(function(response) {
        //console.log(response)
        for (let i = 0; i <response.articles.length && i<10;i++){
            var articleContent = $("<p>");
            var a = $('<a>');
            a.attr('href',response.articles[i].url);
            a.text(response.articles[i].title);
            articleContent.append(a);
            articleContent.append("<br>");
            articleContent.append(response.articles[i].content);
            $("#articleContentDiv").append(articleContent);
        }
    });
}

function newSearch(){ //Create a start point for searching our database
    $("#sideContent").empty();//empty #sideContent
    
    var newSelect = $("<select>");//create select

    var blankOption = $("<option>");
    blankOption.text("--Choose a League--");
    newSelect.append("blankOption");

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
    $("#sideContent").append(newSelect);//append leagueSelect to #sideContent
    
    var idArray = ["teamSelectDiv", "playerSelectDiv", "playerInfoDiv"]; //create different Div names
    for(let i=0; i<idArray.length; i++){
        let newDiv = $("<div>");
        newDiv.attr("id", idArray[i]);
        $("#sideContent").append(newDiv); //apply to #sideContent
    }
}

function populateTeams(){ //Create new select for teams in given league
    //console.log("Populate Teams Reached");
    $("#teamSelectDiv").empty();//empty #teamSelect, #playerSelect, #playerInfo
    $("#playerSelectDiv").empty();
    $("#playerInfoDiv").empty();
    var newSelect = $("<select>");//create select

    var blankOption = $("<option>");
    blankOption.text("--Choose a Team--");
    newSelect.append("blankOption");

    database.ref().on("value", function(snapshot){
        //console.log(snapshot.val().Leagues[selectedLeagueIndex].teamIDs);
        $("#teamSelectDiv").append("There are: " + snapshot.val().Leagues[selectedLeagueIndex].teamIDs.length + " teams in this league!");
        for(let i=0; i<snapshot.val().Leagues[selectedLeagueIndex].teamIDs.length; i++){ //make for loop to pull information from Teams database
            var teamsIndex = 0;
            var newOption = $("<option>");//create new option
            var newName = "";
            while(newName == ""){
                if(snapshot.val().Leagues[selectedLeagueIndex].teamIDs[i] == snapshot.val().Teams[teamsIndex].team_id){
                    newName = snapshot.val().Teams[teamsIndex].name;
                } else {
                    teamsIndex++;
                }
            }
            newOption.text(newName);//assign new option name
            newOption.attr("value", snapshot.val().Teams[teamsIndex].team_id);//assign new option value with teamID
            newSelect.append(newOption);//append option to select
        }
    })
    newSelect.attr("id", "teamSelect");//give select uniqueID (#teamSelect)
    newSelect.attr("class", "browser-default");
    $("#teamSelectDiv").append(newSelect);//append select to #teamSelectDiv
}

function populatePlayers(){
    //console.log("Populate Players Reached")
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
    newSearch();
    $(document).on("change", "#leagueSelect", newLeagueSelected);//onchange of #leagueSelect: newLeagueSelected
    $(document).on("change", "#teamSelect", newTeamSelected);//onchange of #teamSelect: newTeamSelected
    //onchange of #playerSelect: newPlayerSelected
});
