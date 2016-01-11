vitaApp.factory('fileService', ['uuid', 'pouchDB', '$q', 'broadcastService',
function(uuid, pouchDB, $q, broadcastService) {
  var fileService = {};
  
  
  fileService.Broadcast = broadcastService;
  
  //Setup the database for friends
  fileService.db = pouchDB("files");
  
  fileService.LoadFile = function(fileId) {
    var deferred = $q.defer();
    
    return deferred.promise;
  }
  
  fileService.SaveFile = function (fileId, file) {
    var deferred = $q.defer();
    
    return deferred.promise;
  }
  
  return fileService;  
}]);