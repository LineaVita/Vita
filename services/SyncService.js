vitaApp.factory('SyncService', ['uuid', '$q', 'awsService', 'PostService',
function(uuid, $q, awsService, postService) {
  var syncService = {};
  
  syncService.AWSService = awsService;
  syncService.PostService = postService;
  
  syncService.SyncAll = function(lastSyncDate) {
    var deferred = $q.defer();
    
    syncService.SyncPosts(lastSyncDate)
    .then(function() {
      syncService.SyncPlaces(lastSyncDate);
    })
    .then(function() {
      syncService.SyncFriends(lastSyncDate);
    })
    .finally(function () {
      deferred.resolve();
    });
    
    return deferred.promise;
  };
  
  syncService.SyncPlaces = function(lastSyncDate) {
    var deferred = $q.defer();      
    
    syncService.AWSService.ListBucket('places/')
    .then(function (data){
      
      return deferred.resolve();
    });
    
    return deferred.promise;
  };
  
  syncService.SyncFriends = function(lastSyncDate) {
    var deferred = $q.defer();      
    
    syncService.AWSService.ListBucket('friends/')
    .then(function (data){
      
      return deferred.resolve();
    });
    
    return deferred.promise;
  };
  
  syncService.SyncPosts = function(lastSyncDate) {
    var deferred = $q.defer();      
    
    syncService.AWSService.ListBucket('posts/')
    .then(function (data){
      
      return deferred.resolve();
    });
    
    return deferred.promise;
  };
 
  return syncService;
}]);