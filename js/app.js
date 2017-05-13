API_ENTRY = 'https://public-api.wordpress.com/rest/v1.1/sites/128735069'

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'angular-loading-bar',
    'cfp.loadingBar'
])
.config(function($locationProvider, $routeProvider,cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

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
.controller('MainCtrl', [
    '$scope',
    '$http',
    '$interval',
    'cfpLoadingBar',
function($scope, $http, $location, $anchorScroll, $interval, cfpLoadingBar) {
    $http.get(API_ENTRY + '/posts').then(function(response){
        //cfpLoadingBar.start();
        console.log(response);
        $scope.projects = [];
        response.data.posts.forEach(function(post){
            if(post.categories.hasOwnProperty('Projects')){
                var cats = Object.keys(post.categories);
                cats.splice(cats.indexOf('Projects'));
                post.project_type = cats[0];
                $scope.projects.push(post);
            }
            //cfpLoadingBar.inc();
        });
        $scope.home_projects = $scope.projects.slice(0,6);


        console.log($scope.projects);
        //cfpLoadingBar.complete()
    })

    

}]);
