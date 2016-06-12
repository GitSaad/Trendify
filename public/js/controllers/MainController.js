app.controller('MainController', ['$scope', '$timeout', '$window', '$q', 'TwitterService', 'NyTimesService', function($scope, $timeout, $window, $q, TwitterService, NyTimesService) {
    //$scope.twitterInputField = '';
    //$scope.test  = [];



    $scope.tweetSearch = function(){
        $scope.test  = [];
        $scope.tweets = [];

        var inputToJson = {'input':$scope.inputField};
        TwitterService.postInfo(inputToJson);

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
	                    });
	                });
	            });
	        });
        },5000);
    };

    $scope.articleSearch = function () {
        var inputToJson = { 'input': $scope.inputField };
        NyTimesService.postInfo(inputToJson);


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

}]);