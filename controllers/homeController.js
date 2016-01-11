vitaApp.controller('homeController', ['$scope', 'PostService', 'awsService',
function($scope, postService, awsService) {
  $scope.PostService = postService;
  $scope.RecentPosts = [];
    
  $scope.GetRecentPosts = function() {
      postService.GetRecentPosts()
      .then(function(posts) {
        $scope.RecentPosts = posts;
        
        $scope.$apply;
    });
  };
  
  $scope.HasFile = function(post) {
    if (post != null && post.Files != null) {
      if (post.Files.length > 0) {
        return true;
      }        
    }
    
    return false;
  }
  
  $scope.GetFileUrl = function(post) {
    if (post != null && post.Files != null) {
      if (post.Files.length > 0) {
        return '/files/' + post.Files[0];
      }        
    }
  }
  
  $scope.$on('PostServiceReady', function(event, args){
    $scope.GetRecentPosts();
  });
  
  if (postService.Ready) {
    $scope.GetRecentPosts();  
  }  
  
}]);