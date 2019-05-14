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
    console.log(event);
    //selectedLeagueID = event.?
    populateTeams();
    //populateYouTube(event.?.name);
    //populateArticles(event.?.name);
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

function populateYouTube(term){
    console.log(searchTerm);
    //???
}

function populateArticles(searchTerm){
    console.log(searchTerm);
    //???
}

function newSearch(){ //Create a start point for searching our database
    //empty #sideContent
    //create select
    //make for loop to pull information from Leagues database
        //create new option
        //assign new option name + year
        //assign new option value with leagueID
        //append option to select
    //give select uniqueID (#leagueSelect)
    //append leagueSelect to #sideContent
    //create teamSelectDiv and apply to #sideContent
    //create playerSelectDiv and apply to #sideContent
    //create playerInfoDiv and apply to #sideContent
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
    //newSearch();
    //onchange of #leagueSelect: newLeagueSelected
    //onchange of #teamSelect: newTeamSelected
    //onchange of #playerSelect: newPlayerSelected
});