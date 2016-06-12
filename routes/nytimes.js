var express = require('express');
var router = express.Router();
var request = require('request');

var results_array = {
    hpe_results: []
};

var articleAnalyses = {};

beginDate = "20160603";
endDate = "20160610";

function QueryHPE(url, title, snippet, imgurl) {

    var results = {};

    request.get({
        url: "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1",
        qs: {
            'apikey': "9eb439c1-f5c5-4f46-b13f-f784a46e8ec1",
            'url': url
        },
    }, function(err, response, body) {
        parsedbody = JSON.parse(body);
        results['title'] = title;
        results['sentiment'] = parsedbody['aggregate']['sentiment'];
        results['score'] = parsedbody['aggregate']['score'];
        results['snippet'] = snippet;
        results['imgurl'] = 'www.nytimes.com/' + imgurl;
        if (results['score'] != 0) {
            results_array['hpe_results'].push(results);
        }
        })
}

function QueryNyTimes(searchString) {

    request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
            'api-key': "24841a2e46f4425ea3ac87ea3e37e7c3",
            'q': searchString,
            'fq': "headline:" + searchString,
            'fl': "web_url,headline,snippet,multimedia",
            'begin_date': beginDate,
            'end_date': endDate
        },
    }, function (err, response, body) {
        parsedbody = JSON.parse(body);
        for (var i = 0; i < parsedbody.response['docs'].length; i++) {
            QueryHPE(parsedbody.response.docs[i].web_url,
                parsedbody.response.docs[i].headline.print_headline,
                parsedbody.response.docs[i].snippet,
                parsedbody.response.docs[i].multimedia.url);
        }
        articleAnalyses = results_array['hpe_results'];
    })

}

router.route('/api/nytimes')
    .get(function getInfo(req, res, next) {
        return res.status(200).send(articleAnalyses);
    });

router.post('/api/nytimes', function (req, res, next) {
    results_array = {
        hpe_results: []
    };
    QueryNyTimes(req.body.input);
});

module.exports = router;