



var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appSecret =  "d13cb86dd7ec1627cbe8a9c714a7aec6" ;
const token = "EAAS41pkZC8EoBALpHXm4riF19mgxmkuHKAz0yfwi0ooNjaDzGGJeuPQX1ryFozjLZCTv0oVADmEJoVmj8gOi3sVFwaSR0YwyuJlttWgYwYppl01naEU56xMTMFhErc8mfcTnL0BGpGiJMOTy8FtKguZCjZBZCy92ET6aq9bmuqgZDZD";

const validationToken= "facebookpassword";
const serverURL= "https://www.facebook.com/Carinsurance-1853412431606434/";
//var token = "Replace with the access token from Facebook";

    

// This code is called only when subscribing the webhook //
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === validationToken) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
})

app.get('/', function (req, res) {
    
    res.send('facebook webhook setup !');
})

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(appEnv.port, port, function() {
    console.log("server starting on " + appEnv.url);
});