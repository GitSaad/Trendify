app.controller('MainController', ['$scope', '$timeout', '$window', '$q', '$interval', 'TwitterService', 'NyTimesService', function($scope, $timeout, $window, $q, $interval, TwitterService, NyTimesService) {
    //$scope.twitterInputField = '';
    //$scope.test  = [];

    $('#tweetContainer').hide();
    $('#trendGraphContainer').hide();
    $scope.progressBar = 0;
    $scope.test1  = 'nothing';

    $scope.tweetSearch = function(){
        $scope.test  = [];
        $scope.tweets = [];

        var inputToJson = {'input':$scope.inputField};
        TwitterService.postInfo(inputToJson);

        $interval(function() {
        	$scope.progressBar += 1;
        }, 50, 100);

        $timeout(function(){
            TwitterService.getTweet().then(function(data){

                $scope.tweets = [];
                data.forEach(function(i) {
                    $scope.tweets.push({
	                	id: i.tweet_id,
	                	score: i.score
	                });
                });

	            twttr.ready(function(twttr) {
	                $scope.tweets.forEach(function(i) {
	                    twttr.widgets.createTweet(
	                        i.id,
	                        document.getElementById(i.id),
	                        {
	                            conversation:'none'
	                        }
	                    ).then( function( el ) {
	                    	$('.jumbotron').hide();
	                    	$('#tweetContainer').show();
	                    	$('#trendGraphContainer').show();
	                    });
	                });
	            });
	        });
        },40000);
    };

    $scope.articleSearch = function () {
        var inputToJson = { 'input': $scope.inputField };

        NyTimesService.postInfo(inputToJson);

        $timeout(function () {
            NyTimesService.getInfo().then(function (data) {
                $scope.test1 = JSON.stringify(data);

				$scope.headline = data[0].snippet;
				$scope.headlineSentiment = data[0].sentiment;
				$scope.sentimentScore = data[0].score;

                //USE data HERE
            });
        }, 60000)
    };

	window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
			t = window.twttr || {};
		if (d.getElementById(id)) return t;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);

		t._e = [];
		t.ready = function(f) {
			t._e.push(f);
		};

		return t;
	}(document, "script", "twitter-wjs"));

	$scope.sentimentColor = function(score) {
		if (score >= 0.3) {
		    return '#00FF00';
		} else if (score < 0.3 && score >= -0.3) {
		    return '#AAAA00';
		} else {
		    return '#FF0000';
		}

	}

}]);