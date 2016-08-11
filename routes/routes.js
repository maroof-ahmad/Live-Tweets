var mongoose = require('mongoose');
var Tweet = require("../models/models.js");
module.exports = {
  index: function(req,res){
    Tweet.find(function(err,data){
      if(err){
        throw error;
      } else {
        res.send(data);
      }
    });

  }
}
