// display first 3 blog posts on main page
app.component('mainBlog', {
    templateUrl: '../templates/main/blog.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress'];
function Controller($scope, Wordpress) {
    $scope.loading = true;

    Wordpress.getBlogPosts().then(posts => {
        $scope.blogPosts = posts.slice(0,3);
        console.log($scope.blogPosts);
        $scope.loading = false;
        $scope.$apply();
    });
}
