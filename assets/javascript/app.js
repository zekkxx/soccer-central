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
var selectedTeamID;
var selectedPlayerIndex;
var returnedAPIFootballContent; //[{"player_id":882,"player_name":"David de Gea","team_id":33,"team_name":"Manchester United","number":1,"age":28,"position":"G","injured":"False","rating":"6.659459","captain":4,"shots":{"total":0,"on":0},"goals":{"total":0,"conceded":52,"assists":0},"passes":{"total":550,"accuracy":60},"tackles":{"total":0,"blocks":0,"interceptions":0},"duels":{"total":8,"won":6},"dribbles":{"attempts":0,"success":0},"fouls":{"drawn":4,"committed":1},"cards":{"yellow":1,"yellowred":0,"red":0},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":37,"minutes_played":3330,"lineups":37},"substitutes":{"in":0,"out":0,"bench":0}},{"player_id":883,"player_name":"L. Grant","team_id":33,"team_name":"Manchester United","number":13,"age":36,"position":"G","injured":"False","rating":null,"captain":0,"shots":{"total":0,"on":0},"goals":{"total":0,"conceded":0,"assists":0},"passes":{"total":0,"accuracy":0},"tackles":{"total":0,"blocks":0,"interceptions":0},"duels":{"total":0,"won":0},"dribbles":{"attempts":0,"success":0},"fouls":{"drawn":0,"committed":0},"cards":{"yellow":0,"yellowred":0,"red":0},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":0,"minutes_played":0,"lineups":0},"substitutes":{"in":0,"out":0,"bench":9}},{"player_id":884,"player_name":"S. Romero","team_id":33,"team_name":"Manchester United","number":22,"age":32,"position":"G","injured":"False","rating":"7.500000","captain":0,"shots":{"total":0,"on":0},"goals":{"total":0,"conceded":0,"assists":0},"passes":{"total":12,"accuracy":60},"tackles":{"total":0,"blocks":0,"interceptions":0},"duels":{"total":0,"won":0},"dribbles":{"attempts":0,"success":0},"fouls":{"drawn":0,"committed":0},"cards":{"yellow":0,"yellowred":0,"red":0},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":0,"minutes_played":0,"lineups":0},"substitutes":{"in":0,"out":0,"bench":28}},{"player_id":885,"player_name":"E. Bailly","team_id":33,"team_name":"Manchester United","number":3,"age":25,"position":"D","injured":"False","rating":"6.710000","captain":0,"shots":{"total":3,"on":1},"goals":{"total":0,"conceded":0,"assists":0},"passes":{"total":263,"accuracy":65},"tackles":{"total":9,"blocks":4,"interceptions":13},"duels":{"total":50,"won":37},"dribbles":{"attempts":5,"success":4},"fouls":{"drawn":5,"committed":5},"cards":{"yellow":0,"yellowred":0,"red":1},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":12,"minutes_played":637,"lineups":8},"substitutes":{"in":4,"out":2,"bench":13}},{"player_id":886,"player_name":"Diogo Dalot","team_id":33,"team_name":"Manchester United","number":20,"age":20,"position":"D","injured":"False","rating":"6.846666","captain":0,"shots":{"total":13,"on":0},"goals":{"total":0,"conceded":0,"assists":2},"passes":{"total":269,"accuracy":66},"tackles":{"total":10,"blocks":2,"interceptions":10},"duels":{"total":80,"won":53},"dribbles":{"attempts":14,"success":9},"fouls":{"drawn":2,"committed":10},"cards":{"yellow":3,"yellowred":0,"red":0},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":15,"minutes_played":941,"lineups":11},"substitutes":{"in":4,"out":5,"bench":10}},{"player_id":887,"player_name":"M. Darmian","team_id":33,"team_name":"Manchester United","number":36,"age":29,"position":"D","injured":"False","rating":"6.740000","captain":0,"shots":{"total":1,"on":1},"goals":{"total":0,"conceded":0,"assists":0},"passes":{"total":149,"accuracy":69},"tackles":{"total":8,"blocks":0,"interceptions":7},"duels":{"total":39,"won":22},"dribbles":{"attempts":3,"success":1},"fouls":{"drawn":4,"committed":3},"cards":{"yellow":0,"yellowred":0,"red":0},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":6,"minutes_played":443,"lineups":5},"substitutes":{"in":1,"out":1,"bench":11}},{"player_id":888,"player_name":"P. Jones","team_id":33,"team_name":"Manchester United","number":4,"age":27,"position":"D","injured":"False","rating":"7.056250","captain":0,"shots":{"total":5,"on":2},"goals":{"total":0,"conceded":0,"assists":1},"passes":{"total":677,"accuracy":87},"tackles":{"total":13,"blocks":10,"interceptions":22},"duels":{"total":107,"won":76},"dribbles":{"attempts":3,"success":3},"fouls":{"drawn":10,"committed":8},"cards":{"yellow":1,"yellowred":0,"red":0},"penalty":{"success":0,"missed":0,"saved":0},"games":{"appearences":17,"minutes_played":1217,"lineups":14},"substitutes":{"in":3,"out":2,"bench":7}}]

function newLeagueSelected(event){ //when a new league is selected
    //console.log(event.target.value);
    if(event.target.selectedIndex != 0){ //If it isn't the title card
        selectedLeagueIndex = event.target.selectedIndex - 1; //get the position in the Leagues database
        populateTeams(); //populate teams
        populateYouTube(event.target[event.target.selectedIndex].text); //populate youtube
        populateArticles(event.target[event.target.selectedIndex].text); //populate articles
    }
}

function newTeamSelected(event){ //when a new team is selected
    //console.log(event.target.value);
    if(event.target.selectedIndex != 0){ //if it isn't the title card
        selectedTeamIndex = event.target.selectedIndex - 1; //get the position in the array in the Leagues database
        selectedTeamID = event.target[event.target.selectedIndex].value;
        populatePlayers(); //populate players
        populateYouTube(event.target[event.target.selectedIndex].text);
        populateArticles(event.target[event.target.selectedIndex].text);
    }
}

function newPlayerSelected(event){ //when a new player is selected
    //console.log(event.target.value);
    if(event.target.selectedIndex != 0){ //if it isn't the title card
        selectedPlayerIndex = event.target.selectedIndex - 1; //get the position in the returnedAPIFootballContent array;
        populateInfo(); //populate player info
        populateYouTube(event.target[event.target.selectedIndex].text);
        populateArticles(event.target[event.target.selectedIndex].text);
    }
}

 function populateYouTube(searchTerm) { //populate the slider with youtube videos
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
        var sliderShow = $("<ul>"); //create youtube catalog
        sliderShow.attr("class", "slides");
        for(let i=0; i<response.items.length; i++){ //for all response items
            var newItem = $("<li>"); //make an item
            var newDiv = $("<div class='video-container'>"); //make a container
            var newIFrame = $("<iFrame frameborder='0' allowfullscreen>") //make an iFrame
            newIFrame.attr("src", "https://www.youtube.com/embed/"+response.items[i].id.videoId); //and set it to the youtubelink
            //console.log(response.items[i].id.videoId);
            //console.log(newIFrame.attr("src"));
            newDiv.append(newIFrame); //append items in order to body
            newItem.append(newDiv);
            sliderShow.append(newItem);
        }
        console.log($(".video-container"));
        $(".slider").append(sliderShow); //append the youtube catalog to slider
        $('.slider').slider({interval:600000}); //set slider to rotate after 10 minutes
    })
}

function populateArticles(searchTerm) { //Populate the Newsfeed with articles
    $("#articleContentDiv").empty();
    //console.log(searchTerm)
    var googleURL= "https://newsapi.org/v2/everything?q="+ searchTerm + "&apiKey=fb3aa28457e54aeb86cd1dc81bc99f6f"
        //console.log(googleURL)
    
    $.ajax({
        url: googleURL,
        method: "GET"
    }).then(function(response) {
        //console.log(response)
        for (let i = 0; i <response.articles.length && i<10;i++){ //for the number of articles returned to a maximum of 10
            var articleContent = $("<p>"); //create an article
            var a = $('<a>'); //create a link header
            a.attr('href',response.articles[i].url); //link the header
            a.text(response.articles[i].title); //title the header
            articleContent.append(a); //apply the header to the article
            articleContent.append("<br>");
            articleContent.append(response.articles[i].content); //apply content to the article
            $("#articleContentDiv").append(articleContent); //apply the article to the body
        }
    });
}

function newSearch(){ //Create a start point for searching our database
    $("#sideContent").empty();//empty #sideContent
    
    var newSelect = $("<select>");//create select

    var blankOption = $("<option>");
    blankOption.text("--Choose a League--"); //title card for Leagues
    newSelect.append(blankOption);

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
    blankOption.text("--Choose a Team--"); //title card for Teams
    newSelect.append(blankOption);

    database.ref().on("value", function(snapshot){
        //console.log(snapshot.val().Leagues[selectedLeagueIndex].teamIDs);
        $("#teamSelectDiv").append("There are: " + snapshot.val().Leagues[selectedLeagueIndex].teamIDs.length + " teams in this league!");
        for(let i=0; i<snapshot.val().Leagues[selectedLeagueIndex].teamIDs.length; i++){ //make for loop to pull information from Teams database
            var teamsIndex = 0; //Set the position of the starting query in the Teams database to start
            var newOption = $("<option>");//create new option
            var newName = "";
            while(newName == ""){
                if(snapshot.val().Leagues[selectedLeagueIndex].teamIDs[i] == snapshot.val().Teams[teamsIndex].team_id){
                    newName = snapshot.val().Teams[teamsIndex].name; //if teamIDs are matching, save team name
                } else {
                    teamsIndex++; //move to the next position in the Teams database
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
    $("#playerSelectDiv").empty(); //empty #playerSelect, #playerInfo
    $("#playerInfoDiv").empty();
    var newSelect = $("<select>");//create select

    var blankOption = $("<option>");
    blankOption.text("--Choose a Player--"); //title card for Players
    newSelect.append(blankOption);
    var key = "9887e715cdmshd22e37cc0ef550cp19788ajsn2f3c161cecff"; //AJAX API-Football and catch response in returnedAPIFootballContent
    $.ajax({ // API call to get the team members of a team. Takes team ID as parameter
        headers: { 'X-RapidAPI-Key': key }, 
        type: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v2/players/team/' + selectedTeamID, // GET /v2/players/team/{team_id}
        dataType: 'json',
        success: function(response) {
            returnedAPIFootballContent = response.api.players;
            $("#playerSelectDiv").append("There are: " + returnedAPIFootballContent.length + " players on this team!");
            for(var i=0; i<returnedAPIFootballContent.length; i++){ //make for loop to pull information from returnedAPIFootballContent
                var newOption = $("<option>");//create new option
                newOption.text(returnedAPIFootballContent[i].player_name);//assign new option name
                newOption.attr("value", returnedAPIFootballContent[i].player_id);//assign new option value with (player id or index location?)
                newSelect.append(newOption);//append option to select
                //console.log("I ran once");
            }
            newSelect.attr("id", "playerSelect"); //give select uniqueID (#playerSelect)
            newSelect.attr("class", "browser-default");
            $("#playerSelectDiv").append(newSelect);//append select to #playerSelectDiv
        }
    });
    
}

function populateInfo(){ //Displays pertinent player information after player select runs
    $("#playerInfoDiv").empty(); //empty #playerInfo
    var player = returnedAPIFootballContent[selectedPlayerIndex]; //pull information from returnedAPIFootballContent
    //console.log(player);
    //display information in #playerInfoDiv
    $("#playerInfoDiv").append("Age: " + player.age + "<br>");
    $("#playerInfoDiv").append("Position: " + player.position + "<br>");
    if(player.position="g"){
        $("#playerInfoDiv").append("Goals Conceded: " + player.goals.conceded + "<br>");
    } else {
        $("#playerInfoDiv").append("Shots on Goal: " + player.shots.on + "<br>");
        $("#playerInfoDiv").append("Goals: " + player.goals.total + " [" + player.goals.assists + "]" + "<br>");
    }
    $("#playerInfoDiv").append("Pass Accuracy: " + player.passes.accuracy + "<br>");
    $("#playerInfoDiv").append("Has Won: " + player.duels.won + "/" + player.duels.total + " Duels" + "<br>");
    $("#playerInfoDiv").append("Yellow Cards: " + player.cards.yellow + "<br>");
    $("#playerInfoDiv").append("Red Cards: " + player.cards.red + "<br>");
    if(player.position="g"){
        $("#playerInfoDiv").append("Penalty Kicks Saved: " + player.penalty.saved + "<br>");
    } else {
        $("#playerInfoDiv").append("Successful Penalty Kicks: " + player.penalty.success + "<br>");
        $("#playerInfoDiv").append("Unsuccessful Penalty Kicks: " + player.penalty.missed + "<br>");
    }
    $("#playerInfoDiv").append("Played " + player.games.minutes_played + " minutes in " + player.games.appearences + " Games" + "<br>");
}

$(function(){ //On ready document
    firebase.initializeApp(firebaseConfig); //initilize firebase
    database = firebase.database(); //instantiate database
    $('.sidenav').sidenav(); //apply sidenavs
    $('.materialboxed').materialbox(); //apply matrialboxes
    newSearch(); //create start screen
    $(document).on("change", "#leagueSelect", newLeagueSelected); //onchange of #leagueSelect: newLeagueSelected
    $(document).on("change", "#teamSelect", newTeamSelected); //onchange of #teamSelect: newTeamSelected
    $(document).on("change", "#playerSelect", newPlayerSelected); //onchange of #playerSelect: newPlayerSelected
});
