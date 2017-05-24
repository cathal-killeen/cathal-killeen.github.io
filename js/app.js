// data for experience timeline
var experience = [
    {
        time: "February 2011",
        title: "Bell Labs",
        description: "During 5th year in secondary school, I completed a week of work eperience at Bell Labs in Dublin. Here, I worked with Arduino boards and various modules and components, and along with writing the embedded code, I developed several prototype IoT devices in the research lab. This experience solidified my interest in pursuing a career in software development.",
        image_url: "/img/experience/bell.png"
    },
    {
        time: "2014-2018",
        title: "University College Dublin",
        description: "After sitting my Leaving Certificate in June 2014, I began studying Computer Science at UCD the following August.",
        image_url: "/img/experience/ucd.gif"
    },
    {
        time: "2014-2016",
        title: "CoderDojo",
        description: "In October 2014 I began volunteering every Saturday at a CoderDojo club in Marian College, Dublin. At CoderDojo, we teach kids how to code using Scratch, and how to build websites using HTML, CSS and Javascript. The following year I worked at another CoderDojo club at Star of the Sea in Sandymount.",
        image_url: "/img/experience/coderdojo.png"
    },
    {
        time: "November 2014",
        title: "My First Hackathon",
        description: "In November 2014, I attended my first hackathon, Science Hack Day Dublin. It was a 24 hour event and I worked on 2 different projects/teams over the weekend. The first was a video call doorbell/ electronic door lock activated via a mobile app. The second was a skills based freelance website for students, which I ended up pitching to the judges. The doorbell project was the overall winner of the event.",
        image_url: "/img/experience/shd.jpg"
    },
    {
        time: "Summer 2015",
        title: "Go4IT Summer Camp",
        description: "After almost a year working at CoderDojo, I worked at a tech summer camp at Trinity College during summer 2015. At the summer camp, young people worked on various projects such as games using Scratch, stop motion videos, and their own personal websites.",
        image_url: "/img/experience/go4it.jpg"
    },
    {
        time: "January 2016 - August 2016",
        title: "Agrie Internship",
        description: "In 2016 I interned at the agri-tech startup Agrie (previously Plezica). There I worked with Node.js, Grafana and Angular.js to build client dashboards for visualizing agricultural data, along with embedded code for sensor nodes so that they could record various metrics. I also worked on a concept mobile application using the Ionic framework.",
        image_url: "/img/experience/agrie.png"
    },
    {
        time: "August 2016-May 2017",
        title: "Study Abroad CU Boulder",
        description: "During the 2016/17 academic year, I did a study abroad exchange at the University of Colorado Boulder in the USA. Living in Boulder allowed me to travel to many different hackathons across the USA, and visit various tech centers around the country. I also experienced a different academic culture, and was able to take some Computer Science classes that were not available at UCD.",
        image_url: "/img/experience/boulder.jpg"
    }
];

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
    // $('#mainNav').affix({
    //     offset: {
    //         top: 120
    //     }
    // })
})
.controller('MainCtrl', [
    '$scope',
    '$location',
    'Wordpress',
function($scope, $location, Wordpress) {
    console.log($location.search().projects);

    $scope.experience = experience;

    Wordpress.getHomeProjects().then(function(home_projects){
        $scope.home_projects = home_projects;
        console.log($scope.home_projects);
        $scope.$apply();
    });

    Wordpress.getBlogPosts().then(posts => {
        $scope.blogPosts = posts.slice(0,3);
        console.log($scope.blogPosts);
        $scope.$apply();
    })

    $scope.openProject = function(id) {
        console.log("opening: " + id);
        $location.path('/projects/'+id, false);
    }
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
            Wordpress.getProjects().then(function(projects){
                $scope.projects = projects;
                console.log($scope.projects);
                $scope.$apply();
            })
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
