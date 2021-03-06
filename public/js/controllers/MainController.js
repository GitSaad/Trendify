app.controller('MainController', ['$scope', '$timeout', '$window', '$q', '$interval', 'TwitterService', function($scope, $timeout, $window, $q, $interval, TwitterService) {
    //$scope.twitterInputField = '';
    //$scope.test  = [];
	$scope.toggleJumbotron = true;
	$scope.twitterContent = true;

    $scope.progressBar = 0;
    $scope.test1  = 'nothing';

	$scope.scrollIntoView = function(){
		$('html, body').animate({
			scrollTop: $("#trendInfo").offset().top
		}, 1000);
	};

    $scope.tweetSearch = function(){
		$scope.waiting = 'fa fa-spinner fa-5x fa-spin';
        $scope.test  = [];
        $scope.tweets = [];
		$scope.toggleJumbotron = false;

        var inputToJson = {'input':$scope.inputField};
        TwitterService.postInfo(inputToJson);

    	$scope.progressBar = 0;
        $interval(function() {
        	$scope.progressBar += 1;
        }, 50, 100);

        $timeout(function(){
            TwitterService.getTweet($scope).then(function(data){

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
	                    	$('#contentContainer').show();
	                    	$('#trendGraphContainer').show();
	                    });
	                });
	            });
	        });
        },5000);
    };

	//commenting out nytimes related logic since there seems to be an error where connection
	//is refused from their api
    /*$scope.articleSearch = function () {
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
        }, 5000)
    };*/

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