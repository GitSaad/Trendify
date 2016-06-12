var express = require('express');
var router = express.Router();
var request = require('request');

var results_array = {
    hpe_results: []
};

beginDate = "20160603";
endDate = "20160610";

function QueryHPE() {
    // Check how this works
}

function QueryNyTimes(searchString) {

    request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
            'api-key': "24841a2e46f4425ea3ac87ea3e37e7c3",
            'q': searchString,
            'fq': "headline:" + searchString,
            'fl': "web_url, headline",
            'begin_date': beginDate,
            'end_date': endDate
        },
    }, function (err, response, body) {
        body = JSON.parse(body);
        console.log(body);
    })

}

router.route('/api/nytimes')
    .get(function getInfo(req, res, next) {
        return res.status(200).send(tweetsID);
    });

router.post('/api/nytimes', function (req, res, next) {
    results_array = {
        hpe_results: []
    };

    QueryNyTimes(req.body.input);
});

module.exports = router;