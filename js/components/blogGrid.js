app.component('blogGrid', {
    templateUrl: '../templates/blog-grid.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress', '$location'];
function Controller($scope, Wordpress, $location) {
    $scope.loading = true;
    Wordpress.getBlogPosts().then(posts => {
        $scope.blogPosts = posts;
        console.log($scope.blogPosts);
        $scope.loading = false;
        $scope.$apply();
    });

    $scope.openPost = function(id) {
        console.log("opening: " + id);
        $location.path('/blog/'+id, false);
    }
}
