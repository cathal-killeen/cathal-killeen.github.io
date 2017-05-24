var API_ENTRY = 'https://public-api.wordpress.com/rest/v1.1/sites/128735069';

app.factory('Wordpress', [
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
                        // console.log(obj);
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
                            project.html_content = $sce.trustAsHtml(project.content);
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
                    // console.log(posts);
                    posts.forEach(post => {
                        if(post.slug == slug){
                            post.html_content = $sce.trustAsHtml(post.content);
                            resolve(post);
                        }
                    })
                    reject();
                })
            });
        }
    };
}])
