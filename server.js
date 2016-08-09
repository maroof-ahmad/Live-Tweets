var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var twitter = require('ntwitter');
var routes = require('./routes');
var config = require('./config');
var io = require('socket.io');
var streamHandler = require('./utils/streamHandler');

//express instance and setting port variable
var app = expres();
var port = process.env.PORT || 8080;

//set handlebars as the templating engine
app.engine('handlebars', exphbs({defaultlayout: 'main'}));
app.set('view engine', 'handlebars');

app.disable('etag');

//connection to mongoose
mongoose.connect('mongodb://localhost/react-tweets');

//new twitter instance
var twit = new twitter(config.twitter);

//index route
app.get('/', routes.index);

//page routes
app.get('/page/:page/:skip', routes.page);

//set /public as static directory
app.use('/', express.static(__dirname+"/public/"));

//create and start server
var server = http.createServer(app).listen(port, function(){
  console.log("magic happens on port " + port);
});

//socketio
io.listen(server);

//setting a stream listener for tweets
twit.stream('statuses/filter',{ track: 'scotch_io, #scotchio'},function(stream){
  streamhandler(stream,io);
})
