// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'duScroll',
    'ui.router',
    'angularMoment'
])
.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller: 'MainCtrl'
    })
    .when("/projects", {
        templateUrl : "templates/projects.html",
        controller: 'ProjectsCtrl'
    })
    .when("/projects/:id", {
        templateUrl: "templates/projects.html",
        controller: 'ProjectsCtrl'
    })
    .when("/blog", {
        templateUrl : "templates/blog.html",
        controller: 'BlogCtrl'
    })
    .when("/blog/:id", {
        templateUrl: "templates/blog.html",
        controller: 'BlogCtrl'
    })
})
.value('duScrollDuration', 600)
.value('duScrollOffset', 50)
.run(function(){
    //Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 120
        }
    })
})
.controller('MainCtrl', [
    '$scope',
    '$location',
function($scope, $location) {
    console.log($location.search().projects);
}])
.controller('ProjectsCtrl', [
    '$scope',
    '$location',
    '$anchorScroll',
    'Wordpress',
    '$routeParams',
    '$sce',
    '$state',
    function($scope, $location, $anchorScroll, Wordpress, $routeParams, $sce, $state) {
        if($routeParams.id){
            $scope.individual = true;
            Wordpress.getBySlug($routeParams.id).then(function(project){
                $scope.project = project;
                console.log($scope.project);
                $scope.content = $sce.trustAsHtml(project.content);
                $scope.$apply();
            });
        }else{
            $scope.individual = false;
        }

        $scope.openProject = function(id) {
            console.log("opening: " + id);
            $location.path('/projects/'+id, false);
        }

    }])

.controller('BlogCtrl', [
    '$scope',
    '$location',
    '$anchorScroll',
    'Wordpress',
    '$routeParams',
    '$sce',
    '$state',
    function($scope, $location, $anchorScroll, Wordpress, $routeParams, $sce, $state) {
        console.log($routeParams.id);

        if(!!$routeParams.id){
            $scope.individual = true;
            Wordpress.getPost($routeParams.id).then(post => {
                $scope.post = post;
                console.log($scope.post);
                $scope.content = $sce.trustAsHtml(post.content);
                $scope.$apply();
            })
        }else{
            $scope.individual = false;
            Wordpress.getBlogPosts().then(posts => {
                $scope.blogPosts = posts;
                console.log($scope.posts);
                $scope.$apply();
            });
        }

        $scope.openPost = function(id) {
            console.log("opening: " + id);
            $location.path('/blog/'+id, false);
        }
    }]);
