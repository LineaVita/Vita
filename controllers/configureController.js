vitaApp.controller('configureController', ['$scope', '$location', 'FriendService',
  function($scope, $location, configurationService) {
  $scope.newConfig = function(){
    var config = {};
    
    config.UseAWS = false;
    config.AWSKey = "";
    config.AWSSecret = "";
    config.AWSBucketName = "";
    
    return config;
  }

  $scope.loadConfig = function(){
    configurationService.LoadConfiguration()
    .then(function(output) {
      return output;
    });
  }
  
  $scope.getConfig = function() {
    var config = $scope.loadConfig();
    
    if (config == null) {
      config = $scope.newConfig();    
    }
    
    return config;
  }
  
  $scope.saveConfig = function(config) {
    configurationService.SaveConfiguration(config)
    .then(function(output) {
      $location.path('/home');        
    });
  }
  
  $scope.Configuration = $scope.getConfig();
 
}]);