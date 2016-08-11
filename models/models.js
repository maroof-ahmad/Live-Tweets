var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
});

var Tweet = mongoose.model('Tweet',schema);
module.exports = Tweet;
