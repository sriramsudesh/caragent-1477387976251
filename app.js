



var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var Botkit = require('botkit');


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
    
    res.send('Facebook messenger application. This is a Webhook setup !');
})

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port,host, function() {
    console.log("server starting on" + "http://localhost:3000");
});



const watson = require('watson-developer-cloud');

/**
 * Instantiate the Watson Conversation Service
 */
const conversation = new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME || '27b64514-3f7d-41b0-a63b-5cc6fcf62af4',
  password: process.env.CONVERSATION_PASSWORD || '4XSICbtLfm7Y',
  version_date: '2016-07-11'
});


/**
 * Payload for the Watson Conversation Service
 * <workspace-id> and user input text required.
 */
const payload = {
  workspace_id: process.env.WORKSPACE_ID || '886e4044-1e18-4424-827b-295ca975478c',
  input: {
    text: 'I am happy to talk to you today.'
  }
};

conversation.message(payload, function(err, data) {
  if (err) {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
    // FROM CONVERSATION SERVICE
    console.error(JSON.stringify(err, null, 2));
  } else {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
    // FROM CONVERSATION SERVICE
    console.log(JSON.stringify(data, null, 2));
  }
});
