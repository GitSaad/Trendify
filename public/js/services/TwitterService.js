app.factory('TwitterService', ['$http', function ($http) {

    return{
        getTweet:getTweet,
        postInfo:postInfo
    };

    function  getTweet(){
        return $http.get('/api/twitter')
            .then(function(res)
            {
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
