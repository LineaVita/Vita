vitaApp.factory('SyncService', ['uuid', '$q', 'AWSService', 'PostService',
function(uuid, pouchDB, $q, awsService, postService) {
  var syncService = {};
  
  syncService.AWSService = awsService;
  syncService.PostService = postService;
  
  syncService.SyncAll = function(lastSyncDate) {
    var deferred = $q.defer();
    
    syncService.SyncPosts(lastSyncDate)
    .finally(function () {
      deferred.resolve();
    });
    
    return deferred.promise;
  };
  
  syncService.SyncPosts = function(lastSyncDate) {
    var deferred = $q.defer();
    
    
    
    
    return deferred.promise;
  }
  
  return syncService;
}]);