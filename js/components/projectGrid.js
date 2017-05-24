app.component('projectGrid', {
    templateUrl: '../templates/project-grid.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress', '$location'];
function Controller($scope, Wordpress, $location) {
    $scope.loading = true;
    Wordpress.getProjects().then(
        projects => {
            $scope.projects = projects;
            console.log($scope.projects);
            $scope.loading = false;
            $scope.$apply();
        }
    );

    $scope.openProject = function(id) {
        console.log("opening: " + id);
        $location.path('/projects/'+id, false);
    }
}
