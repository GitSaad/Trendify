app.controller('MainController', ['$scope', '$window', '$q','TwitterService', function($scope, $window, $q, TwitterService) {
    $scope.twitterInputField = '';

    TwitterService.getTweet().then(function(data){
        $scope.fromServer = data.message;
    });


    $scope.tweetSearch = function(){
        //$scope.fromServer = 'clicked';
        var inputToJson = {'input':$scope.twitterInputField};
        TwitterService.postInfo(inputToJson);
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

	$scope.tweets = [
        {
            'id': '20',
            'sentiment': 0.05
        },
        {
            'id': '21',
            'sentiment': -0.14
        },
        {
            'id': '22',
            'sentiment': -0.05
        },
        {
            'id': '23',
            'sentiment': -0.13
        },
        {
            'id': '25',
            'sentiment': 0.58
        },
        {
            'id': '26',
            'sentiment': 0.56
        },
        {
            'id': '29',
            'sentiment': 0.54
        },
        {
            'id': '507185938620219395',
            'sentiment': -0.99
        }
	];
    //$scope.getFromServer = Twitter.getTweet();
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
}]);