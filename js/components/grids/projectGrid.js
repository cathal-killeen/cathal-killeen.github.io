app.component('projectGrid', {
    templateUrl: '../templates/project-grid.html',
    controller: Controller
});

//whitelist for tags
var tags = ['angularjs','heroku','ucd','hackathon','bootstrap','node.js'];
var info = {
    'angularjs': {
        id: 'angularjs',
        title: 'AngularJS',
        image: '/img/tags/angular.png',
        color: '#DD0031',
        description: "<a href='https://angularjs.org/' target='_blank'>AngularJS</a> is a structural framework for creating dynamic web apps. The following are my projects that have been built with Angular."
    },
    'ucd': {
        id: 'ucd',
        title: 'UCD',
        image: '/img/tags/ucd.gif',
        color: '#003366',
        description: "These are projects which I worked on as part of classes I have taken at University College Dublin."
    },
    'heroku': {
        id: 'heroku',
        title: 'Heroku',
        image: '/img/tags/heroku.png',
        color: '#430098',
        description: "<a href='https://www.heroku.com/platform#platform-diagram-detail' target='_blank'>Heroku</a> is a cloud application platform. I often use Heroku to deploy projects I am working on. The following are my projects which are currently deployed on Heroku."
    },
    'hackathon': {
        id: 'hackathon',
        title: 'Hackathon',
        image: '/img/tags/hackathon.png',
        color: '#68A052',
        description: "<b><a href='https://medium.com/hackathons-anonymous/wtf-is-a-hackathon-92668579601' target='_blank'>WTF is a hackathon?</a></b><br><br>I have attended dozens of hackathons around Ireland, Europe and the USA. The following are some of the projects I worked on during the short 24 / 36 hour periods."
    },
    'bootstrap': {
        id: 'bootstrap',
        title: 'Bootstrap',
        image: '/img/tags/bootstrap.png',
        color: '#563D7C',
        description: "<a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a> is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web. The following are projects which I have built using Bootstrap."
    },
    'node.js': {
        id: 'node.js',
        title: 'Node.js',
        image: '/img/tags/node.png',
        color: '#6EA169',
        description: "<a href='https://nodejs.org/en/' target='_blank'>Node.js</a> is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side. Node.js' package ecosystem, <a href='https://www.npmjs.com/' target='_blank'>npm</a>, is the largest ecosystem of open source libraries in the world. The following are my projects which have been built with Node.js."
    }
}


Controller.$inject = ['$scope', 'Wordpress', '$location', '$sce'];
function Controller($scope, Wordpress, $location, $sce) {
    $scope.loading = true;

    $scope.links = info;
    // queried tag (returns true if no tag ie '?projects=')
    var tag = $location.search().projects;
    if(typeof tag === 'string'){
        tag = tag.toLowerCase();
        if(_.contains(tags, tag)){
            $scope.display = tag;
            $scope.info = info[tag];
            if($scope.info){
                $scope.description = $sce.trustAsHtml($scope.info.description);
                document.title = $scope.info.title + ' Projects - Cathal Killeen';
            }
        }
    }

    //check if a particular project should be shown if a tag is selected
    $scope.show = project => {
        if($scope.display){
            // get keys from tag object
            tagKeys = _.keys(project.tags);
            // convert all keys to lowercase for easier comparison
            var projectTags = _.invoke(tagKeys, "toLowerCase");

            // if this project has the queried tag
            if(_.contains(projectTags, $scope.display)){
                return true;
            }else{
                return false;
            }

        }else{
            return true;
        }
    }

    Wordpress.getProjects().then(
        projects => {
            $scope.projects = projects;
            //console.log($scope.projects);
            $scope.loading = false;
            $scope.$apply();
        }
    );
}
