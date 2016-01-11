vitaApp.controller('postController', ['$scope', '$routeParams', '$location', 'PostService', 'GPSService', 'FileService',
function($scope, $routeParams, $location, postService, gpsService, fileService) {
  $scope.PostService = postService;
  $scope.GPSService = gpsService;
  
  $scope.GetGPS = function() {
    $scope.GPSService.GetLocation()
    .then(function (position){
      $scope.Post.Location = position;
    });
  };
  
  $scope.SavePost = function(post) {
    postService.SavePost(post)
    .then(function(output) {
      $location.path('/home');  
    });
  };
  
  $scope.FileNameChanged = function(imgControl) {
    if ($scope.Post != null) {
      var files = imgControl.files;
      var namesArr = [];
      
      for (i = 0, len = files.length; i < len; i++) { 
          namesArr.push(files[i].name)
      }
      
      $scope.Post.Filename = namesArr.join(' ,');
      $scope.$apply();
    }
  };
  
  $scope.GetLocationString = function() {
    return $scope.PostService.GetLocationString($scope.Post.Location);
  };
  
  $scope.GetPostDateString = function() {
    return $scope.PostService.GetPostDateString($scope.Post.PostDateTime)
  };
  
  $scope.Post = postService.NewPost();
  
  //Set the current post to work with
  if ($routeParams.postId != null) {
    postService.GetPost($routeParams.postId)
    .then(function(post) {
      $scope.Post = post;
      $scope.GetLocationString();
    })
    .catch(function(error) {
      console.writeln(error);
    });
  }
  else {
    $scope.GetGPS();
  }
  
}]);