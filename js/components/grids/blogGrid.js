app.component('blogGrid', {
    templateUrl: '../templates/blog-grid.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress'];
function Controller($scope, Wordpress) {
    $scope.loading = true;
    Wordpress.getBlogPosts().then(posts => {
        $scope.blogPosts = posts;
        console.log($scope.blogPosts);
        $scope.loading = false;
        $scope.$apply();
    });
}
