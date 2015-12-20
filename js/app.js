var vitaApp = angular.module('vita', ['ngRoute', 'pouchdb','ngMaterial'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/home", {templateUrl: "partials/home.html", controller: "homeController"}).
	when("/configure", {templateUrl: "partials/configure.html", controller: "configureController"}).
	when("/post", {templateUrl: "partials/post.html", controller: "postController"}).
	when("/friends", {templateUrl: "partials/friends.html", controller: "friendsController"}).
	when("/friend/:friendId", {templateUrl: "partials/friend.html", controller: "friendController"}).
	otherwise({redirectTo:"/home"});
}]);