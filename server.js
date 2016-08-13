var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var twitter = require('twitter');
var routes = require('./routes/routes.js');
var io = require('socket.io');
var streamHandler = require('./utils/streamHandler.js');
var config = require('./config/config.js')

//express instance and setting port variable
var app = express();
var port = process.env.PORT || 8080;

//set ejs as the templating engine
app.set('view engine', 'ejs');

//connection to mongoose
mongoose.connect('mongodb://localhost/react-tweets');

//new twitter instance
var twitter = new twitter(config.twitter);

//index route
app.get('/', routes.index);

//page routes
// app.get('/page/:page/:skip', routes.page);

//set /public as static directory
app.use('/', express.static(__dirname+"/public/"));

//create and start server
var server = http.createServer(app).listen(port, function(){
  console.log("magic happens on port " + port);
});

//socketio
var io = io.listen(server);

//setting a stream listener for tweets
twitter.stream('statuses/filter',{ track: 'twitter'},function(stream){
  streamHandler(stream,io);
  stream.on('error', function(error) {
    throw error;
  });
});
