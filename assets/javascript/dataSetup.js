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

function pullLeaguesAJAX(){
    database.ref().once("value", function(snapshot){
        //console.log(snapshot.val());
        if(snapshot.child("Leagues").exists() != true){
            //console.log("Getting League information");
            $.ajax({
                headers: { 'X-RapidAPI-Key': "9887e715cdmshd22e37cc0ef550cp19788ajsn2f3c161cecff" }, 
                type: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/leagues',
                dataType: 'json',
                success: function(response) {
                    //console.log(response.api);
                    var leagueArray = response.api.leagues;
                    var index = 0;
                    //console.log(response.api.results);
                    for(var i=1; i<response.api.results+10; i++){
                        //console.log(leagueArray[i])
                        if(leagueArray[i] != undefined){
                            //console.log(leagueArray[i].name);
                            var setToIndex = false;
                            var name = leagueArray[i].name;
                            var leagueID = leagueArray[i].league_id;
                            var season = leagueArray[i].season;
                            if(season == 2019){
                                setToIndex = true;
                            } else if (name == "Champions League" || name == "Europa League") {
                                setToIndex = true;
                            } else if (name == "UEFA Nations League") {
                                setToIndex = true;
                            } else if (name.search("World Cup") != -1){
                                setToIndex = true;
                            }
                            if (setToIndex){
                                database.ref("/Leagues/"+index).set({
                                    leagueID: leagueID,
                                    name: name,
                                    season: season
                                });
                                index++;
                            }
                        }
                    }
                }
            });
        } else {
            console.log("Database already exists");
        }
    })
}

$(function(){
    //pullLeaguesAJAX();
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    var userDefined = new Object;
    userDefined.leagueID = 458;
    userDefined.teamArray = [{"team_id":"685","name":"Torpedo Kutaisi"},{"team_id":"704","name":"Chikhura Sachkhere"},{"team_id":"705","name":"Dinamo Batumi"},{"team_id":"2262","name":"Dinamo Tbilisi"},{"team_id":"3499","name":"Dila"},{"team_id":"3500","name":"Lokomotivi Tbilisi"},{"team_id":"3501","name":"Rustavi"},{"team_id":"3502","name":"Saburtalo"},{"team_id":"3503","name":"Sioni"},{"team_id":"3504","name":"WIT Georgia"}];
    
    
    userDefined.idArrray = [];
    for(let i = 0; i<userDefined.teamArray.length; i++){
        userDefined.idArrray.push(userDefined.teamArray[i].team_id);
    }
    console.log(userDefined.idArrray.toString());

    database.ref().once("value", function(snapshot){
        console.log(snapshot.val());
        var leaguesArray = snapshot.val().Leagues;
        console.log(leaguesArray);
        var teamsArray = snapshot.val().Teams;
        console.log(teamsArray);
        var index = 0;
        var teamIDsNotInserted = true;

        while(index<leaguesArray.length && teamIDsNotInserted){
            //console.log(leaguesArray[i]);
            if(leaguesArray[index].leagueID == userDefined.leagueID){
                database.ref("/Leagues/"+index).update({
                    teamIDs: userDefined.idArrray
                })
                teamIDsNotInserted = false;
            } else {
                //console.log("No team ID exists");
                index++;
            }
        }

        if(teamsArray != undefined){
            for(let i=0; i<userDefined.teamArray.length; i++){
                var teamNotDefined = true;
                index = 0;
                while(index<teamsArray.length && teamNotDefined){
                    if(teamsArray[index].team_id == userDefined.teamArray[i].team_id){
                        teamNotDefined = false;
                        console.log("Matched IDs of "+ teamsArray[index].team_id + " and " + userDefined.teamArray[i].team_id);
                    }
                    index++;
                }
                if(teamNotDefined){
                    teamsArray.push(userDefined.teamArray[i]);
                    console.log("Pushed information");
                }
            }
            database.ref().update({
                Teams: teamsArray
            });
        } else {
            database.ref().update({
                Teams: userDefined.teamArray
            })
            console.log("Created Teams Database");
        }
        
            
    })    

});