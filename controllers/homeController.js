vitaApp.controller('homeController', ['$scope', 'PostService',
function($scope, postService) {
  $scope.RecentPosts = [];
  
  $scope.getRecentPosts = function() {
    postService.GetRecentPosts()
    .then(function(posts) {
      $scope.RecentPosts = posts;
    });
  }
  
  $scope.getRecentPosts();
  
}]);