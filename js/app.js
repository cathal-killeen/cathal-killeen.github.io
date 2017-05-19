var API_ENTRY = 'https://public-api.wordpress.com/rest/v1.1/sites/128735069'
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
]


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
.run(function($rootScope) {
    if(!window.history || !history.replaceState) {
      return;
    }
    $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
      //Automaticly update location
      var hash = $element.prop('hash');
      if (hash) {
        history.replaceState(null, null, hash);
      }
    });
})
.controller('MainCtrl', [
    '$scope',
    '$http',
    '$location',
    '$anchorScroll',
    '$interval',
    function($scope, $http, $location, $anchorScroll, $interval) {
        $scope.experience = experience;

        // $('body').scrollspy({
        //     target: '.navbar-fixed-top',
        //     offset: 51
        // });
        //
        // // Closes the Responsive Menu on Menu Item Click
        // $('.navbar-collapse ul li a').click(function(){
        //         $('.navbar-toggle:visible').click();
        // });
        //
        // // Offset for Main Navigation
        // $('#mainNav').affix({
        //     offset: {
        //         top: 120
        //     }
        // })

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
