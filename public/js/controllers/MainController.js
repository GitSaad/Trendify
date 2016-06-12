app.controller('MainController', ['$scope', '$window', '$q','TwitterService', function($scope, $window, $q, TwitterService) {
    $scope.twitterInputField = '';
    $scope.test  = [];
    $scope.tweetSearch = function(){

        TwitterService.getTweet().then(function(data){

            var inputToJson = {'input':$scope.twitterInputField};
            TwitterService.postInfo(inputToJson);

            $scope.tweets = [];
            data.forEach(function(i) {
                $scope.tweets.push({
                	id: i.tweet_id,
                	score: i.score
                });
            });

            for(var i=0; i<data.length; i++)
            {
                $scope.test.push(JSON.stringify(data[i]));
            }

            console.log(data)
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