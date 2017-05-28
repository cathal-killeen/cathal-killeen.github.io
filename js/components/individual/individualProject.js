app.component('individualProject', {
    templateUrl: '../templates/individual/project.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress', '$location'];
function Controller($scope, Wordpress, $location) {
    $scope.loading = true;
    Wordpress.getBySlug($location.search().project).then(function(project){
        $scope.project = project;
        //console.log($scope.project);
        $scope.loading = false;
        $scope.$apply();
    });
}
