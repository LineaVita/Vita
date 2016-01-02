vitaApp.controller('postController', ['$scope', '$routeParams', '$location', 'PostService',
function($scope, $routeParams, $location, postService) {
  $scope.PostService = postService;
  
  $scope.savePost = function(post) {
    postService.SavePost(post)
    .then(function(output) {
      $location.path('/home');  
    });
  }
  
  $scope.getPostDateString = function() {
    return $scope.PostService.GetPostDateString($scope.Post.PostDateTime)
  };
  
  $scope.Post = postService.NewPost();
  
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