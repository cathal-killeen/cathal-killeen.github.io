var API_ENTRY = 'https://public-api.wordpress.com/rest/v1.1/sites/128735069'

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

// social media links and info
var social = [
    {
        name: "GitHub",
        url: "https://github.com/cathal-killeen",
        username: "cathal-killeen",
        icon: "fa-github"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/cathalkilleen/",
        username: "cathalkilleen",
        icon: "fa-linkedin"
    },
    {
        name: "AngelList",
        url: "https://angel.co/cathalkilleen",
        username: "cathalkilleen",
        icon: "fa-angellist"
    },
    {
        name: "Twitter",
        url: "https://twitter.com/cathalkilleen",
        username: "cathalkilleen",
        icon: "fa-twitter"
    }
]


// Declare app level module which depends on views, and components
angular.module('app', [
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
.run(function($rootScope) {
    if(!window.history || !history.replaceState) {
        return;
    }

})
.component('socialIcon', {
    transclude: true,
    template: '<a ng-show="$ctrl.info" ng-href="{{$ctrl.info.url}}" target="_blank"><i class="fa" ng-class="$ctrl.info.icon"></i></a>',
    controller: function() {
        this.$onInit = function() {
            social.forEach(network => {
                if(network.name === this.name){
                    this.info = network;
                }
            })
        }
    },
    bindings: {
        name: '@'
    }
})
.factory('Wordpress', [
    '$rootScope',
    '$http',
    '$sce',
    function($rootScope, $http, $sce) {

    // Private methods

    // get all posts from Wordpress API endpoint
    function get() {
        return new Promise(function(resolve, reject) {
            $http.get(API_ENTRY + '/posts').then(function(response){
                $rootScope.siteData = response.data;
                resolve(response.data);
            });
        });
    }

    // find projects and appent custom data
    // projects are posts with 'Project' category
    function findProjects(posts) {
        return new Promise(function(resolve, reject) {
            var projects = [];
            posts.forEach(function(post){
                if(post.categories.hasOwnProperty('Projects')){
                    //get sub categories
                    var cats = Object.keys(post.categories);
                    cats.splice(cats.indexOf('Projects'));
                    post.project_type = cats[0];

                    // parse json from excerpt
                    var stripped = post.excerpt.replace(/<(?:.|\n)*?>/gm, '').replace(/\&#038;/gm, '&').replace(/\&#\d{4};/gm, '"');
                    // check if excerpt is in json format
                    if(stripped[0] === '{'){
                        var obj = angular.fromJson(stripped);
                        console.log(obj);
                        post.demo_links = obj;
                    }

                    projects.push(post);
                }
            });
            $rootScope.projects = projects;
            $rootScope.home_projects = projects.slice(0,6);

            resolve(projects);
        });
    }

    // get all posts with category 'Blog'
    function getBlogPosts(){
        return new Promise(function(resolve, reject) {
            if($rootScope.blogPosts){
                var blogPosts = $rootScope.blogPosts;
                resolve(blogPosts);
            }else{
                get().then(function(data){
                    var blogPosts = [];
                    data.posts.forEach(function(post){
                        if(post.categories.hasOwnProperty('Blog')){
                            post.sample = $sce.trustAsHtml(post.excerpt);
                            blogPosts.push(post);
                        }
                    });
                    $rootScope.blogPosts = blogPosts;

                    resolve(blogPosts);
                })
            }
        });
    }

    // returns Projects - public method
    function getProjects(){
        return new Promise(function(resolve, reject) {
            if($rootScope.siteData){
                if($rootScope.projects){
                    var projects = $rootScope.projects;
                    resolve(projects);
                }else{
                    findProjects($rootScope.siteData.posts).then(function(projects){
                        resolve(projects);
                    });
                }
            }
            else{
                get().then(function(data){
                    findProjects(data.posts).then(function(projects){
                        resolve(projects);
                    });
                })
            }
        });
    }

    // public API
    return {
        getBlogPosts: getBlogPosts,
        getProjects: getProjects,
        getHomeProjects: () => {
            return new Promise(function(resolve, reject) {
                getProjects().then(function(projects){
                    homeProjects = projects.slice(0,6);
                    resolve(homeProjects);
                })
            });
        },
        getBySlug: (slug) => {
            return new Promise(function(resolve, reject) {
                getProjects().then(function(projects){
                    projects.forEach(function(project){
                        if(project.slug == slug){
                            resolve(project);
                        }
                    })
                    reject();
                })
            });
        },
        getPost: (slug) => {
            return new Promise(function(resolve, reject) {
                getBlogPosts().then(posts => {
                    console.log(posts);
                    posts.forEach(post => {
                        if(post.slug == slug){
                            resolve(post);
                        }
                    })
                    reject();
                })
            });
        }
    };
}])

.controller('MainCtrl', [
    '$scope',
    '$http',
    '$location',
    '$anchorScroll',
    '$interval',
    'Wordpress',
    '$sce',
function($scope, $http, $location, $anchorScroll, $interval, Wordpress, $sce) {
    $scope.experience = experience;

    $scope.sent = false;
    $scope.error = "";

    $scope.contact = {
        name: "",
        email: "",
        message: ""
    }

    var validateMessage = function(){
        if($scope.contact.name.length > 0){
            if($scope.contact.email.length > 0){
                if($scope.contact.message.length > 0){
                    return true;
                }else{
                    $scope.error = "Please enter a message.";
                    return false;
                }
            }else{
                $scope.error = "Please enter an email.";
                return false;
            }
        }else{
            $scope.error = "Please enter a name.";
            return false;
        }
    }

    angular.element("#img-heading").animate("tada");

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

    $scope.sendMessage = function() {
        if(validateMessage()){
            $http({
                url: "http://formspree.io/" + "cathalkilleen+website" + "@" + "gmail" + "." + "com",
                data: $.param(
                    $scope.contact
                ),
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response){
                if(response.status == 200){
                    $scope.error = "";
                    $scope.sent = true;
                }
                console.log(response);
            })
        }
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
