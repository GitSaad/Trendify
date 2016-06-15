/**
 * Created by Ali on 2016-06-11.
 */
var async = require('async');
var express = require('express');
var Twitter = require('twitter');
var router = express.Router();
var request = require('request');
 
var results_array = { 
	hpe_results : []
};

beginDate = "20160603";
endDate = "20160610";


// Perform sentiment analysis with tweets
var GetSentiment = function QuerySentiment(article, callback) {   
    var results = {}; 
    request.get({
	    url: "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1",
	    qs: {
	    	'apikey': "9eb439c1-f5c5-4f46-b13f-f784a46e8ec1",
	    	'url': article['web_url']
	    }}, 
	    function(err, response, body) {
                sentiments = JSON.parse(body);
	        results['title'] = article['headline']['print_headline'];
	        results['snippet'] = article['snippet'];	
		results['sentiment'] = sentiments['aggregate']['sentiment'];
		results['score'] = sentiments['aggregate']['score'];
		results['imgurl'] = 'www.nytimes.com/' + article['multimedia'][0]['url'];
		
		if(results['sentiment'] != 'neutral') {
                	results_array['hpe_results'].push(results);
		}
		return callback();
	    });
    
}


// Get articles using NYtimes API and pass to sentiment analysis function
function QueryNYTimes(searchString) {
	request.get({
		url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	        qs : {
		'api-key': "24841a2e46f4425ea3ac87ea3e37e7c3",
		'q': searchString,	
		'fq': 'headline:' + searchString,
	        'fl': "web_url,headline,snippet,multimedia",
	        'begin_date' : beginDate,
	        'end_date' : endDate
		}
	}, function (err, response, body) {
                 var parsedbody = JSON.parse(body); 
		 var articles = parsedbody.response['docs'];     
		 async.each(articles, GetSentiment, function(err){ var articleAnalyses = results_array['hpe_results']; });			
   	});

}


//Routes to connect with server
router.route('/api/nytimes')
    .get(function getInfo(req, res, next) {	
            return res.status(200).send(articleAnalyses);
    });

router.post('/api/nytimes',function(req,res,next){
	//Reset array
	results_array = { 
		hpe_results : []
	};
        QueryNYTimes(req.body.input);
  
});
module.exports = router; 
