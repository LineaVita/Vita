vitaApp.controller('syncController', ['$scope', '$routeParams', '$location', 'PostService', 'GPSService', 'FileService', 'PlaceService', 'ConfigurationService',
function($scope, $routeParams, $location, postService, gpsService, fileService, placeService, configService) {  
  
  $scope.LastSyncTime = null;
  $scope.LastSyncTimeString = null;
  $scope.ProgressMode = null;
  $scope.Syncing = false;
    
  $scope.GetLastSyncTimeString = function() {
    configService.GetSettingByName('LastAWSSyncTime')
    .then(function (rawValue) {
      if (rawValue != null) {
        var d = new Date(rawValue);
        $scope.LastSyncTime = d;
        $scope.LastSyncTimeString = "Last sync time: " + d.toLocaleDateString() + " " + d.toLocaleTimeString();
      } else {
        $scope.LastSyncTimeString = "Last sync time: Never synced";
      }      
    });
  }
  
  $scope.SyncNow = function () {
    $scope.ProgressMode = "indeterminate";
    $scope.Syncing = true;

  }
  
  //Run setup functions
  $scope.GetLastSyncTimeString();

}]);
                                      