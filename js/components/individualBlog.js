app.component('individualBlog', {
    templateUrl: '../templates/individual/blog.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress', '$location', '$routeParams'];
function Controller($scope, Wordpress, $location, $routeParams) {
    $scope.loading = true;
    Wordpress.getPost($routeParams.id).then(post => {
        $scope.post = post;
        console.log($scope.post);
        $scope.loading = false;
        $scope.$apply();
    });

    $scope.openPost = function(id) {
        console.log("opening: " + id);
        $location.path('/blog/'+id, false);
    }
}
