vitaApp.controller('postController', ['$scope', '$routeParams', '$location', 
  function($scope, $routeParams, $location) {
  
  $scope.newPost = function(){
    var post = {};
    
    post.DateTime = Date.now();   
    post.Text = "Testing";
    post.getDateString = function() {
      var d = new Date(this.DateTime);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString()
    }
       
    return post;
  }
  
  $scope.loadPost = function(postId) {
    var post = $scope.newPost();
    
    //todo = load values;
  }
  
  $scope.savePost = function(post) {
    //TODO - save the post via service
    
    $location.path('/home');
  }
  
  
  //Set the current post to work with
  if ($routeParams.postId == null) {
    $scope.Post = $scope.newPost();
  } else {
    $scope.Post = $scope.loadPost($routeParams.postId);
  }  
  
}]);