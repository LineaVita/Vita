vitaApp.controller('postController', ['$scope', '$routeParams', '$location', 'PostService', 'GPSService',
function($scope, $routeParams, $location, postService, gpsService) {
  $scope.PostService = postService;
  $scope.GPSService = gpsService;
  
  $scope.GetGPS = function() {
    $scope.GPSService.GetLocation()
    .then(function (position){
      $scope.Post.Location = position;
    });
  }
  
  $scope.savePost = function(post) {
    postService.SavePost(post)
    .then(function(output) {
      $location.path('/home');  
    });
  }
  
  $scope.GetLocationString = function() {
    return $scope.PostService.GetLocationString($scope.Post.Location);
  }
  
  $scope.GetPostDateString = function() {
    return $scope.PostService.GetPostDateString($scope.Post.PostDateTime)
  };
  
  $scope.Post = postService.NewPost();
  $scope.GetGPS();
  
  //Set the current post to work with
  if ($routeParams.postId != null) {
    postService.GetPost($routeParams.postId)
    .then(function(post) {
      $scope.Post = post;
    })
    .catch(function(error) {
      console.writeln(error);
    });
  }  
  
}]);