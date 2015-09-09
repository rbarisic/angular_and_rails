"use strict";

(function () {

    // define this module
    var myApp = angular.module('myApp', [
        'ngRoute',
        // 'myApp.createAuthor',
        // 'myApp.createArticle',
        // 'myApp.showArticles'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app/views/articleCreate.html',
                controller:  'articleCreateCtrl'
            })
            .when('/authors/', {
                templateUrl: '/app/views/authorIndex.html',
                controller:  'authorShowCtrl'
            })
            .otherwise({templateUrl: '/app/views/authorIndex'});
    });

    var serverUrl = 'http://localhost:3000';    

    myApp
        .controller('mainCtrl', function($route, $routeParams, $location) {
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
        })

    myApp
        .controller('articleIndexCtrl', function($scope, $http) {
            $http.get(serverUrl)
        })

      // create angular controller and pass in $scope and $http
      myApp
        .controller('articleCreateCtrl', function($scope, $http) {

            // create a blank object to hold our form information
            // $scope will allow this to pass between controller and view
            $scope.formData = {};

            var createArticleRequest = {
                method:     'POST',
                url:        (serverUrl + '/articles/'),
                data:       $.param($scope.formData), // pass in Data as strings
                headers:    { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
            }

            $scope.processForm = function() {
                $http(createArticleRequest)
                .success(function(data) {
                        // if successfull, bind success message to message
                        $scope.message = data.message;
                        $scope.status = status;
                        console.log('sucess');
                })
                .error(function(data) {
                    console.log('error');
                });
            };
        });

    myApp
        .controller('authorShowCtrl', function($scope, $http) {

            var getAuthorsRequest = {
                method:     'GET',
                url:        (serverUrl + '/authors/'),
            }

            $scope.getAuthors = function() {
                $http(getAuthorsRequest)
                .success(function(data) {
                    // if successfull, bind authors to var author
                    $scope.authors = data;
                    console.log('successfully got authors');
                })
                .error(function(data) {
                    console.log("couldn't get authors");
                });
            }();
        });

})();