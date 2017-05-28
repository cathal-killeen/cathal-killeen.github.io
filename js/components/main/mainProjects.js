// display of first 6 projects on main page
app.component('mainProjects', {
    templateUrl: '../templates/main/projects.html',
    controller: Controller
});


Controller.$inject = ['$scope', 'Wordpress'];
function Controller($scope, Wordpress) {
    $scope.loading = true;

    Wordpress.getHomeProjects().then(function(home_projects){
        $scope.home_projects = home_projects;
        //console.log($scope.home_projects);
        $scope.loading = false;
        $scope.$apply();
    });
}
