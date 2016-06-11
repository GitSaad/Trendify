angular.module('TwitterService', []).factory('Twitter', ['$http', function ($http) {

    return {

        get : function () {
            return $http.get('/api/twitter');
        },

        post : function(data) {
            return $http.post('/api/twitter', data);
        }

    }

}]);
