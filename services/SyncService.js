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
  
  syncService.ProcessArrays = function(type, localsObjects, remoteObjects) {   
    var localsToPush = [];
    var serverToGet = [];
    var i = 0;
    
    if (remoteObjects == null || remoteObjects.Contents.length == 0) {
      if (localsObjects != null && localsObjects.length > 0) {        
        //Push everything up
        for (i = 0; i < localsObjects.length; i++) {
          localsToPush.push(localsObjects[i]);
        }  
      }          
    }  else if(localsObjects == null || localsObjects.length == 0) {
      if (remoteObjects != null && remoteObjects.Contents.length > 0) {        
        //Bring everything down
        for (i = 0; i < remoteObjects.Contents.length; i++) {
          serverToGet.push(remoteObjects.Contents[i]);
        }  
      }              
    } else {
      //Loop through weed out what is already on server
      for (i = 0; i < remoteObjects.Contents.length ; i++) {
        var remoteObject = remoteObjects.Contents[i];
        
        var id = remoteObject.Key.slice(type.length + 1, -5);
        var lastModified = Date.parse(remoteObject.LastModified);
        
        var localObject = syncService.FindInList(id, localsObjects);
        if (localObject == null) {
          console.log("Remote Object to Get");
          serverToGet.push(remoteObject);          
        } else {
          //Check the date
          console.log("Found object checking date");
        }
      }                
    }  
  }
  
  syncService.FindInList = function(id, list) {
    for (var j = 0; j<list.length; j++) {
      var obj = list[j];
      
      if (obj._id == id) {
        return obj;
      }
    }
    
    return null;
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