app.controller('MainController', ['$scope', '$window', '$q','TwitterService', function($scope, $window, $q, TwitterService) {
    TwitterService.getTweet().then(function(data){
        $scope.fromServer = data.message;
    });

    $scope.tweetSearch = function(){
        $scope.fromServer = 'clicked';
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
            'positiveSentiment': true
        },
        {
            'id': '21',
            'positiveSentiment': false
        },
        {
            'id': '22',
            'positiveSentiment': true
        },
        {
            'id': '23',
            'positiveSentiment': false
        },
        {
            'id': '25',
            'positiveSentiment': true
        },
        {
            'id': '26',
            'positiveSentiment': false
        },
        {
            'id': '29',
            'positiveSentiment': true
        },
        {
            'id': '507185938620219395',
            'positiveSentiment': false
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