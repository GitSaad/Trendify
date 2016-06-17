/**
 * Created by Ali on 2016-06-11.
 */
var async = require('async');
var express = require('express');
var Twitter = require('twitter');
var router = express.Router();
var request = require('request');

var tweetsID
// Create client for authentication 
var twitter_client = new Twitter({
  consumer_key: 't13fmeGDe3NRiBUmzwU263fwi',
  consumer_secret: 'uPR2lN35HQA3HJVXv95LZLEauqJYfIim8Eh2ZGa5boDGAEKnGm',
  access_token_key: '706909442055512064-fztu40SS89xiLTJtC8JqNROG2fBpiDK',
  access_token_secret: 'z6HA10kqM8Peqt5dK4Bu6QUiwMfnkop0LI41sYqI3Javj'
});

 
var results_array = { 
	hpe_results : []
};


// Perform sentiment analysis with tweets
var GetSentiment = function QuerySentiment(tweet, callback) {   
    var results = {};
    request.get({
	    url: "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1",
	    qs: {
	    	'apikey': "9eb439c1-f5c5-4f46-b13f-f784a46e8ec1",
	    	'text': tweet['text']
	    }}, 
	    function(err, response, body) {
                sentiments = JSON.parse(body);      
    		results['tweet_id'] = tweet['id_str'];
		results['sentiment'] = sentiments['aggregate']['sentiment'];
		results['score'] = sentiments['aggregate']['score'];
		
		if(results['sentiment'] != 'neutral') {
                	results_array['hpe_results'].push(results);
		}
		return callback();
	    });
    
};


// Get tweets using twitter API and pass to sentiment analysis function
function QueryTwitter(searchString) {
	queryParams = {
		'q': searchString + ' -filter:retweets',
		'lang': 'en',	
		'result_type': 'popular'
	};
   
	twitter_client.get('search/tweets', queryParams, function (error, response, body) {
		var tweets = response['statuses'];     
		async.each(tweets, GetSentiment, function(err){ tweetsID = results_array['hpe_results']; });
	});

}


//Routes to connect with server
router.route('/api/twitter')
    .get(function getTweets(req, res, next) {
            var test = {
                "message":"From the server"
            };
	    console.log('hello');
            return res.status(200).send(tweetsID);
    });

router.post('/api/twitter',function(req,res,next){
	//Reset array
	results_array = { 
		hpe_results : []
	};
        QueryTwitter(req.body.input);
  
});
module.exports = router; 
