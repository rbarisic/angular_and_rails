(function () {

    // define this module
    var myApp = angular.module('myApp', []);
    var serverUrl = 'http://localhost:3000';    

    myApp
        .controller('articlesIndexCtrl', function($scope, $http) {
            $http.get(serverUrl)
        })

      // create angular controller and pass in $scope and $http
      myApp
        .controller('articlesCreateCtrl', function($scope, $http) {

            // create a blank object to hold our form information
            // $scope will allow this to pass between controller and view
            $scope.formData = {};

            $scope.processForm = function() {
                $http({
                    method:     'POST',
                    url:        (serverUrl + '/articles/'),
                    data:       $.param($scope.formData), // pass in Data as strings
                    headers:    { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
                })
                .success(function(data) {
                        // if successfull, bind success message to message
                        $scope.message = data.message;
                        $scope.status = status;
                })
                .error(function(data) {
                    console.log(data);
                    >> Object { title: Array[1], content: Array[1], author: Array[1] }
                });
            };
        });
})();