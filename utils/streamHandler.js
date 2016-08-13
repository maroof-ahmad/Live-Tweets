var Tweet = require("../models/models.js");

module.exports = function(stream,io){


  stream.on("data",function(data){
    if (data['user'] !== undefined){

      //create new tweet
      var tweet = {
        twid: data['id_str'],
        active: false,
        author: data['user']['name'],
        avatar: data['user']['profile_image_url'],
        body: data['text'],
        date: data['created_at'],
        screenname: data['user']['screen_name']
      };
      // console.log(tweet);
      // process.exit();

      var newTweet = new Tweet(tweet);
      // console.log(typeof newTweet);
      newTweet.save(function(err,data){

        if(err){
          throw err;
        } else {
          // console.log(io);
           io.emit("new Tweet",data);
        }
      });
    }

  });

}
