API_ENTRY = 'https://public-api.wordpress.com/rest/v1.1/sites/128735069'

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute'
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})
.controller('MainCtrl', [
    '$scope',
    '$http',
    '$interval',
function($scope, $http, $location, $anchorScroll, $interval) {
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
