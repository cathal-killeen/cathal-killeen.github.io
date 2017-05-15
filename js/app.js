API_ENTRY = 'https://public-api.wordpress.com/rest/v1.1/sites/128735069'

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'duScroll'
])
.config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller: 'MainCtrl'
    })
    .when("/projects", {
        templateUrl : "templates/projects.html"
    });
})
.value('duScrollDuration', 600)
.value('duScrollOffset', 50)
.controller('MainCtrl', [
    '$scope',
    '$http',
    '$location',
    '$anchorScroll',
    '$interval',
    function($scope, $http, $location, $anchorScroll, $interval) {
        angular.element("#img-heading").animate("tada");

        $scope.scrollTo = function(hash) {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash(hash);

            // call $anchorScroll()
            $anchorScroll();
        };

        $http.get(API_ENTRY + '/posts').then(function(response){
            console.log(response);
            $scope.projects = [];
            response.data.posts.forEach(function(post){
                if(post.categories.hasOwnProperty('Projects')){
                    var cats = Object.keys(post.categories);
                    cats.splice(cats.indexOf('Projects'));
                    post.project_type = cats[0];
                    $scope.projects.push(post);
                }
            });
            $scope.home_projects = $scope.projects.slice(0,6);


            console.log($scope.projects);
        })



    }]);
