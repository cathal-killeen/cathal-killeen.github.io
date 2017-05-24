app.component('projectGrid', {
    templateUrl: '../templates/project-grid.html',
    controller: Controller
});

Controller.$inject = ['$scope', 'Wordpress'];
function Controller($scope, Wordpress) {
    $scope.loading = true;
    Wordpress.getProjects().then(
        projects => {
            $scope.projects = projects;
            console.log($scope.projects);
            $scope.loading = false;
            $scope.$apply();
        }
    );
}
