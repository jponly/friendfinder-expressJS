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
        //Comparing user with their best friend match 
        //Object to hold the best match
        var greatMatch = {
            name: "",
            photo: "",
            matchDifference: 1000
        };
        // Here we take the result of the user's survey POST and parse it.
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

                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= greatMatch.friendDifference) {

                    greatMatch.name = friends[i].name;
                    greatMatch.photo = friends[i].photo;
                    greatMatch.friendDifference = totalDifference;
                }
            }
        }
        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friends.push(userData);

        // Return a JSON with the user's match. This will be used by the HTML in the next page. 
        res.json(greatMatch);
    });


    app.post("/api/clear", function (req, res) {
        friends.length = [];
        res.json({ ok: true });
    });
};