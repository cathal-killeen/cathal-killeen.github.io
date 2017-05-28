var ANALYTICS = 'UA-99915540-1';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'duScroll',
    'ui.router',
    'angularMoment',
    'angular-google-analytics',
    'mj.scrollingTabs'
])
.config(function($locationProvider, $routeProvider, AnalyticsProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when("/", {
        templateUrl : "templates/app.html",
        controller: 'AppCtrl'
    })

    AnalyticsProvider.setAccount(ANALYTICS);

    AnalyticsProvider.trackUrlParams(true);

})
.value('duScrollDuration', 600)
.value('duScrollOffset', 50)
.run(function(Analytics){
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
.controller('AppCtrl', [
    '$scope',
    '$location',
    'Wordpress',
function($scope, $location, Wordpress) {
    var route = $location.search();

    if(route.hasOwnProperty('projects')){
        $scope.state = 'projects';
        document.title = 'Projects - Cathal Killeen';
    }else if(route.hasOwnProperty('project')){
        $scope.state = 'project';
        Wordpress.getProjectTitle(route.project).then(title => {
            document.title = title + ' - Cathal Killeen';
        })
    }else if(route.hasOwnProperty('blog')){
        $scope.state = 'blog';
        document.title = 'Blog - Cathal Killeen';
    }else if(route.hasOwnProperty('post')){
        $scope.state = 'post';
        Wordpress.getPostTitle(route.post).then(title => {
            document.title = title + ' - Cathal Killeen';
        })
    }else{
        $scope.state = 'main';
        document.title = 'Cathal Killeen';
    }
    console.log($scope.state);
}]);
