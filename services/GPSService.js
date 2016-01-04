vitaApp.factory('GPSService', ['$q', 
function($q) {
  var gpsService = {};
  
  //Sets up empty object
  gpsService.NewPosition = function() {
    var position = {};
    
    position.Latitude = null;
    position.Longitude = null;
    
    return position;
  };
  
  gpsService.GetLocation = function() {
    var deferred = $q.defer();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          if (pos != null && pos.coords != null) {
            var position = gpsService.NewPosition();

            position.Latitude = pos.coords.latitude;
            position.Longitude = pos.coords.longitude;

            deferred.resolve(position);
          } else {
            deferred.resolve(null);
          }
        });
    } else {
        deferred.resolve(null);
    }
    
    return deferred.promise;
  };
  
  
  // factory function body that constructs shinyNewServiceInstance
  return gpsService;
  
}]);