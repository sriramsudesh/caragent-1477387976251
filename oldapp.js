/*************************************************************************************************

  Define global variables for NPM packages and Cloud Foundry environment

*************************************************************************************************/
"use strict";

var express = require('express'),
    cfenv = require("cfenv"),
    appEnv = cfenv.getAppEnv(),
    app = express(),
    bodyParser = require('body-parser'),

    watson = require('watson-developer-cloud');

/************************************************************************************************* 
  facebook page_token = 'EAAS41pkZC8EoBACT0qBgfGJFz6fgtnBAlZCk1tS4byDnOUAHja6uz78SZAjft6d0f3tEKS0KNoXC5syS5Tw22g1XDanSS3y06OBeMeCN8KB5o56PPMiW5FQ9sYMFxiAZBZCP5I0o01j7UsZCXs62KqlzssqG7Kf9aBBfeKX7s7JgZDZD';
  facebook app_secret = 'd13cb86dd7ec1627cbe8a9c714a7aec6'
  facebook app_id ='1329131740459082'

  Start the server 
  
*************************************************************************************************/
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url);
});

/*************************************************************************************************

 Watson Conversation

*************************************************************************************************/
var conversation = watson.conversation({
  "url": "https://gateway.watsonplatform.net/conversation/api",
  "password": "0g3rxXsTJR43",
  "username": "2b9c4433-1d2d-4fee-8759-a5cb12672816",
   "version_date": '2016-07-11',
   "version": 'v1'
});

// Allow clients to interact with the bot
app.post('/api/bot', function(req, res) {
    
    console.log("Got request for Le Bot");
    console.log("Request is: ",req);

    var workspace = 'b7823d36-a6c6-49bb-a60e-a0b76669027b'; // Set to your Conversation workspace ID

    if (!workspace) {
        console.log("No workspace detected. Cannot run the Watson Conversation service.");
    }

    var params = {
        workspace_id: workspace,
        context: {}, // Null context indicates new conversation
        input: {}    // Holder for message
    };

    // Update options to send to conversation service with the user input and a context if one exists
    if (req.body) {
        if (req.body.input) {
            params.input = req.body.input;
        }

        if (req.body.context) {
            params.context = req.body.context;
        }
    }

    // Send message to the conversation service with the current context
    conversation.message(params, function(err, data) {
        if (err) {
            console.log("Error in sending message: ", err);
            return res.status(err.code || 500).json(err);
        }

        console.log("Response: ", data);

        return res.json(data);
    });

}); // End app.post '/api/bot'

