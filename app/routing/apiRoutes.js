var friends = require("../data/friends.js");
var path = require('path');



//Routes
module.exports = function(app){

    // API GET Requests
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    app.post("/api/friends", function (req, res) {
       
        var greatMatch = {
            name: "",
            photo: "",
            matchDifference: 1000
        };
    
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;


        var totalDifference = 0;

        // Loop through all the friend possibilities in the database.
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i].name);
            totalDifference = 0;

            // Loop through all the scores of each friend
            for (var j=0; j< friends[i].scores[j]; j++) {

                // Calculating the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // If the sum of differences is less then the differences of "great match"
                if (totalDifference <= greatMatch.friendDifference) {

                    greatMatch.name = friends[i].name;
                    greatMatch.photo = friends[i].photo;
                    greatMatch.friendDifference = totalDifference;
                }
            }
        }
      
        friends.push(userData);

        // Return a JSON with the user's match. 
        res.json(greatMatch);
    });

};