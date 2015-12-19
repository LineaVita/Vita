var vitaApp = angular.module('vita', ['ngRoute', 'pouchdb'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/home", {templateUrl: "partials/home.html", controller: "homeController"}).
	when("/configure", {templateUrl: "partials/configure.html", controller: "configureController"}).
	when("/post", {templateUrl: "partials/post.html", controller: "postController"}).
	otherwise({redirectTo:"/home"});
}]);