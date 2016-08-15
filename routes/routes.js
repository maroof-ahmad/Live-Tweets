var mongoose = require('mongoose');
var Tweet = require("../models/models.js");
module.exports = {
  index: function(req,res){
    Tweet.find(function(err,data){
      //index page
        res.render('../views/index',{title:'twitter-stream'});
      });
  },

  alltweets: function(req,res){
    Tweet.find(function(err,data){
      if(err){
        throw error;
      } else {
        // send tweets to initialize page
        console.log("called");
        res.send(data);
      }
    });
  }
}
