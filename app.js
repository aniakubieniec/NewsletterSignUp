const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const request = require('request');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    const email = req.body.email;
    const firstName = req.body.firstName;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/9256caa3e0";
    const options = {
        method: "POST",
        auth: "userKey:30811ae3c2824cbe81c420d82584a323-us14"
    };
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {

            console.log(response.statusCode);
        })

    })
    request.write(jsonData);
    request.end();


});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server started on port 3000")
});


// API Key
// 30811ae3c2824cbe81c420d82584a323-us14

