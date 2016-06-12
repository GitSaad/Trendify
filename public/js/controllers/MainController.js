app.controller('MainController', ['$scope', '$timeout', '$window', '$q', '$interval', 'TwitterService', 'NyTimesService', function($scope, $timeout, $window, $q, $interval, TwitterService, NyTimesService) {
    //$scope.twitterInputField = '';
    //$scope.test  = [];

    $('#contentContainer').hide();
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
                var sum = 0;
                var count = 0;
                data.forEach(function(i) {
                    $scope.tweets.push({
	                	id: i.tweet_id,
	                	score: i.score
	                });
	                sum += i.score;
	                count++;
                });

                $scope.avgTwitterScore = sum/count;

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
	                    	$('#contentContainer').show();
	                    	$('#trendGraphContainer').show();
	                    });
	                });
	            });
	        });
        },5000);
    };

    $scope.articleSearch = function () {
        var inputToJson = { 'input': $scope.inputField };
        NyTimesService.postInfo(inputToJson);

        $timeout(function () {
            NyTimesService.getInfo().then(function (data) {
                $scope.test1 = JSON.stringify(data);
                //USE data HERE
            });
        }, 10000)
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