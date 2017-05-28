app.component('individualBlog', {
    templateUrl: '../templates/individual/blog.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress', '$location'];
function Controller($scope, Wordpress, $location) {
    $scope.loading = true;
    Wordpress.getPost($location.search().post).then(function(post) {
        $scope.post = post;
        //console.log($scope.post);
        $scope.loading = false;
        $scope.$apply();
    });
}
