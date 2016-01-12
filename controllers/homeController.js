vitaApp.controller('homeController', ['$scope', 'PostService', 'awsService', 'FileService',
function($scope, postService, awsService, fileService) {
  $scope.PostService = postService;
  $scope.FileService = fileService;
  $scope.RecentPosts = [];
  $scope.Images = {};
    
  $scope.GetRecentPosts = function() {
      postService.GetRecentPosts()
      .then(function(posts) {
        $scope.RecentPosts = posts;
        
        $scope.$apply;
    });
  };
  
  $scope.HasFile = function(post) {
    if (post != null && post.FileIds != null) {
      if (post.FileIds.length > 0) {
        return true;
      }        
    }
    
    return false;
  }
  
  $scope.GetFileUrl = function(post) {
    
    if (post != null && post.FileIds != null) {
      if (post.FileIds.length > 0) {
        var id = post.FileIds[0];
        
        $scope.Images[id] = null;
                
        $scope.FileService.GetFile(id)
        .then(function(url) {
          $scope.Images[id] = url;
        });
        
        return $scope.Images[id];
      }        
      
      return null;
    }
  }
  
  $scope.$on('PostServiceReady', function(event, args){
    $scope.GetRecentPosts();
  });
  
  if (postService.Ready) {
    $scope.GetRecentPosts();  
  }  
  
}]);