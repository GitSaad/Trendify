app.controller('MainController', ['$scope', '$timeout', '$window', '$q', 'TwitterService', function($scope, $timeout, $window, $q, TwitterService) {
    //$scope.twitterInputField = '';
    //$scope.test  = [];



    $scope.tweetSearch = function(){
        $scope.test  = [];
        $scope.tweets = [];
        //$scope.fromServer = 'clicked';

        var inputToJson = {'input':$scope.twitterInputField};
        TwitterService.postInfo(inputToJson);

        $timeout(function(){
            TwitterService.getTweet().then(function(data){


                $scope.tweets = [];
                data.forEach(function(i) {
                    $scope.tweets.push(i.tweet_id);
                });

                for(var i=0; i<data.length; i++)
                {
                    $scope.test.push(JSON.stringify(data[i]));
                }


                twttr.ready(function(twttr) {
                    $scope.tweets.forEach(function(i) {
                        console.log(i);
                        twttr.widgets.createTweet(
                            i,
                            document.getElementById(i),
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

    //$scope.getFromServer = Twitter.getTweet();

}]);