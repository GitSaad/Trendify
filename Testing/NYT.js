
var request = require('request')

searchString = "Trump";
beginDate = "20150501";
endDate = "20160505";


function QueryNYT(searchString, beginDate, endDate ) {

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
	  console.log(JSON.stringify(body));

	})

}


QueryNYT(searchString, '','');