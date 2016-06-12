/**
 * Created by Ali on 2016-06-11.
 */

var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var request = require('request')

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


var tweetsID = {};



function QueryHPE(searchString, tweet_id) {
    
    var results = {};

	request.get({
	  url: "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1",
	  qs: {
	    'apikey': "9eb439c1-f5c5-4f46-b13f-f784a46e8ec1",
	    'text': searchString
	   
	  },
	}, function(err, response, body) {

	  body = JSON.parse(body);
      results['tweet_id'] = tweet_id;
      results['sentiment'] = body['aggregate']['sentiment'];
      results['score'] = body['aggregate']['score'];
      results_array['hpe_results'].push(results);
		//tweetsID = results_array['hpe_results'];
     // console.log(results_array['hpe_results']);
	})

}

function QueryNYT(searchString) {

	request.get({
	  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	  qs: {
	    'api-key': "24841a2e46f4425ea3ac87ea3e37e7c3",
	    'q': searchString,
	    'fq': "headline:"+searchString,
	    'fl': "headline",
	    'begin_date':beginDate,
	    'end_date':endDate,
	    'page': 5
	  },
	}, function(err, response, body) {
	  body = JSON.parse(body);
	  console.log(body);


	})

}

// Returns JSON of response 
function QueryTwitter(searchString) {
	queryParams = {
		'q': searchString + ' -filter:retweets',
		'lang': 'en',
		'result_type': 'popular',
	};
   
    
	twitter_client.get('search/tweets', queryParams, function (error, response, body) {
		if (!error) {
			var tweets = {'tweet': response};

			for (var i = 0; i < tweets.tweet['statuses'].length; i++) {
				console.log(tweets.tweet['statuses'][i]['id_str']);
		    	        tweet_id = tweets.tweet['statuses'][i]['id_str'];
			        tweet_text = tweets.tweet['statuses'][i]['text'];
			        QueryHPE(tweet_text, tweet_id);
			}
		}
		tweetsID = results_array['hpe_results'];

		console.log('From post'+ JSON.stringify(tweetsID));
	});

}

router.route('/api/twitter')
    .get(function getTweets(req, res, next) {
            var test = {
                "message":"From the server"
            };
            return res.status(200).send(tweetsID);
    });

router.post('/api/twitter',function(req,res,next){
	    //Reset array
	results_array = { 
		hpe_results : []
	};
	console.log('test string here');
    console.log(results_array['hpe_results'].length);

    QueryTwitter(req.body.input);
});
module.exports = router;
