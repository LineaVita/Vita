vitaApp.controller('postController', ['$scope', '$routeParams', '$location', 'PostService',
function($scope, $routeParams, $location, postService) {
  
  $scope.savePost = function(post) {
    postService.SavePost(post)
    .then(function(output) {
      $location.path('/home');  
    });
  }
  
  $scope.getPostDateString = function() {
    var d = new Date($scope.Post.PostDateTime);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString()
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