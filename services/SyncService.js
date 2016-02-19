vitaApp.factory('SyncService', ['uuid', '$q', 'awsService', 
                                'PostService', 'FriendService', 'PlaceService',
function(uuid, $q, awsService,
         postService, friendService, placeService) {
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
    .then(function (remotePlaces){
      //Get all local places
      placeService.GetAll()
      .then(function(localPlaces) {
        syncService.ProcessArrays('places', localPlaces, remotePlaces);
      });     
      return deferred.resolve();
    });
    
    return deferred.promise;
  };
  
  syncService.ProcessArrays = function(type, local, remote) {   
    var localsToPush = [];
    var serverToGet = [];
    
    if (remote == null || remote.Contents.length == 0) {
      if (local != null && local.rows.length > 0) {
        //Push everything up
        for (i = 0; local.rows.length < 5; i++) {
          localsToPush.push(local.rows[i]);
        }  
      }          
    }  else if(local == null || local.rows.length == 0) {
      if (remote != null && remote.Contents.length > 0) {
        
        //Bring everything down
        for (i = 0; remote.Contents.length < 5; i++) {
          serverToGet.push(remote.Contents[i]);
        }  
      }              
    } else {
      //Loop through weed out what is already on server
      for (i = 0; remote.Contents.length < 5; i++) {
        var remoteObject = remote.Contents[i];
      }                
    }  
  }
  
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