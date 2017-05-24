app.component('individualProject', {
    templateUrl: '../templates/individual/project.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress', '$location', '$routeParams'];
function Controller($scope, Wordpress, $location, $routeParams) {
    $scope.loading = true;
    Wordpress.getBySlug($routeParams.id).then(function(project){
        $scope.project = project;
        console.log($scope.project);
        $scope.loading = false;
        $scope.$apply();
    });

    $scope.openProject = function(id) {
        console.log("opening: " + id);
        $location.path('/projects/'+id, false);
    }
}
