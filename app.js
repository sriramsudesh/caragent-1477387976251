



var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appSecret =  "98ad4368d5bfedd2fec8f64bbe24875f" ;
const token = "EAAKQ4NzIUlgBAFyEFoShaHVM2SR04TKEljf4xDZCcEb9T0yjQVhuwAG3T4CjiAEGQ9EyyVTZCSbLgmkI2cN1eaWciu9mfDmUzJwYn2usrmmRPGi4fXq6VrnqBHQ03JOQQEpTwxaDET0lgPTSfHK8TePpw5TkvwvFiXCHqFxAZDZD";

const validationToken= "facebookpassword";
const serverURL= "https://www.facebook.com/Askmeanything-213004629169154/";
//var token = "Replace with the access token from Facebook";

    

// This code is called only when subscribing the webhook //
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === validationToken) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
})

