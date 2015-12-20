vitaApp.controller('configureController', ['$scope', '$location', 
  function($scope, $location) {
  $scope.newConfig = function(){
    var config = {};
    
    config.UseAWS = false;
    config.AWSKey = "";
    config.AWSSecret = "";
    config.AWSBucketName = "";
    
    return config;
  }

  $scope.loadConfig = function(){
    //TODO try to load the config
    
    return null;
  }
  
  $scope.getConfig = function() {
    var config = $scope.loadConfig();
    
    if (config == null) {
      config = $scope.newConfig();    
    }
    
    return config;
  }
  
  $scope.saveConfig = function(config) {
    //TODO save the config
    
    
    $location.path('/home');
  }
  
  $scope.Configuration = $scope.getConfig();
 
}]);