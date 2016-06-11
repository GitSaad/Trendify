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
            'color': '#DB2828',
            'user_location': {lat: 43.65422, lng: -79.3976585},
            'positiveSentiment': true
        },
        {
            'id': '21',
            'color': '#21BA45',
            'user_location': {lat: 43.656236, lng: -79.394746},
            'positiveSentiment': false
        },
        {
            'id': '22',
            'color': '#21BA45',
            'user_location': {lat: 43.652562, lng: -79.394563},
            'positiveSentiment': true
        },
        {
            'id': '23',
            'color': '#DB2828',
            'user_location': {lat: 43.6542342, lng: -79.3924525},
            'positiveSentiment': false
        },
        {
            'id': '25',
            'color': '#2185D0',
            'user_location': {lat: 43.652342, lng: -79.391345},
            'positiveSentiment': true
        },
        {
            'id': '26',
            'color': '#DB2828',
            'user_location': {lat: 43.655245, lng: -79.393536},
            'positiveSentiment': false
        },
        {
            'id': '29',
            'color': '#2185D0',
            'user_location': {lat: 43.65245, lng: -79.3934563},
            'positiveSentiment': true
        },
        {
            'id': '507185938620219395',
            'color': '#2185D0',
            'user_location': {lat: 43.6563535, lng: -79.3988475},
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