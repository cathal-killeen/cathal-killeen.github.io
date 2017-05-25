var ANALYTICS = 'UA-99915540-1';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'duScroll',
    'ui.router',
    'angularMoment',
    'angular-google-analytics'
])
.config(function($locationProvider, $routeProvider, AnalyticsProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when("/", {
        templateUrl : "templates/app.html",
        controller: 'AppCtrl'
    })

    AnalyticsProvider.setAccount(ANALYTICS);

    // for testing localhost
    AnalyticsProvider.setDomainName('none');

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
function($scope, $location) {
    var route = $location.search();

    if(route.hasOwnProperty('projects')){
        $scope.state = 'projects';
    }else if(route.hasOwnProperty('project')){
        $scope.state = 'project';
    }else if(route.hasOwnProperty('blog')){
        $scope.state = 'blog';
    }else if(route.hasOwnProperty('post')){
        $scope.state = 'post';
    }else{
        $scope.state = 'main';
    }
    console.log($scope.state);
}]);
