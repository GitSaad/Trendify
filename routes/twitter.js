/**
 * Created by Ali on 2016-06-11.
 */

var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

// Create client for authentication 
var twitter_client = new Twitter({
  consumer_key: 't13fmeGDe3NRiBUmzwU263fwi',
  consumer_secret: 'uPR2lN35HQA3HJVXv95LZLEauqJYfIim8Eh2ZGa5boDGAEKnGm',
  access_token_key: '706909442055512064-fztu40SS89xiLTJtC8JqNROG2fBpiDK',
  access_token_secret: 'z6HA10kqM8Peqt5dK4Bu6QUiwMfnkop0LI41sYqI3Javj'
});
 



function QueryTwitter(searchString) {
	queryParams = {
		    'q': searchString,
		    'lang':'en',
		    'result_type':'popular',
		  };


	twitter_client.get('search/tweets', queryParams, function(error, response, body){
	  if (!error) {
	  	var tweets = response;
	  
	  	for (var i=0; i<tweets['statuses'].length; i++){
			console.log(tweets['statuses'][i]['id']);
			

		}
	  }
	});
}

router.route('/api/twitter')
    .get(function getTweets(req, res, next) {
            var test = {
                "message":"From the server"
            };
            return res.status(200).send(test);
    });

router.post('/api/twitter',function(req,res,next){
    QueryTwitter(req.body.input);
});
module.exports = router;