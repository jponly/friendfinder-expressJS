var friendsData = require("../data/friendsData");


module.exports = function (app) {

    app.get("/api/survey", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/survey", function (req, res) {

        // if (friendsData.length < 5) {
        //     friendsData.push(req.body);
        //     res.json(true);
        // }
        // else {
        //     // .push(req.body);
        //     res.json(false);
        // }
    });


    app.post("/api/clear", function (req, res) {

        friendsData.length = [];
        res.json({ ok: true });
    });
};



