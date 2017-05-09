// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute'
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})
.controller('MainCtrl', [
    '$scope',
    '$http',
    '$interval',
function($scope, $http, $location, $anchorScroll, $interval) {
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

}]);
