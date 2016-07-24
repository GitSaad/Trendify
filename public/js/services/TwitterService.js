app.factory('TwitterService', ['$http', function ($http) {

    return{
        getTweet:getTweet,
        postInfo:postInfo
    };

    function  getTweet(scope){

        return $http.get('/api/twitter')
            .then(function(res)
            {
                scope.waiting=undefined;
                return res.data
            });
    }

    function postInfo(searchString){
        return $http.post('/api/twitter', searchString)
        .success(function () {
           //handle success
        })
        .error(function () {
           //handle error
        })
        
    }

}]);
