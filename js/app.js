angular.module('vita', [
  'vita.controllers',
  'vita.services',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/", {templateUrl: "partials/home.html", controller: "homeController"}).
	otherwise({redirectTo: '/'});
}]);