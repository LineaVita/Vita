vitaApp.controller('homeController', ['$scope', 'PostService', 'awsService',
function($scope, postService, awsService) {
  $scope.PostService = postService;
  $scope.RecentPosts = [];
  
  
  $scope.getRecentPosts = function() {
      postService.GetRecentPosts()
      .then(function(posts) {
        $scope.RecentPosts = posts;
        
        $scope.$apply;
    });
  };
  
  $scope.$on('PostServiceReady', function(event, args){
    $scope.getRecentPosts();
  });
  
  if (postService.Ready) {
    $scope.getRecentPosts();  
  }  
  
}]);