vitaApp.controller('postController', ['$scope', '$routeParams', '$location', 'PostService',
function($scope, $routeParams, $location, postService) {
  
  $scope.newPost = function(){
    return postService.NewPost();
  }
  
  $scope.loadPost = function(postId) {
    var post = $scope.newPost();
  }
  
  $scope.savePost = function(post) {
    postService.SavePost(post)
    ,then(function(output) {
      $location.path('/home');  
    });
  }
  
  $scope.Post = $scope.newPost();
  
  //Set the current post to work with
  if ($routeParams.postId != null) {
    postService.GetPost($routeParams.postId)
    .then(function(post) {
      $scope.Post = post;
    });
  }  
  
}]);