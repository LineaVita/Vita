vitaApp.factory('PlaceService', ['uuid', 'pouchDB', '$q', 'broadcastService',
function(uuid, pouchDB, $q, broadcastService) {
  var placeService = {};
  
  //Set variables
  placeService.Broadcast = broadcastService;
  placeService.uuid = uuid;
  placeService.Ready = false;
    
  //Setup the database
  placeService.db = pouchDB("places"); 
   
  //New Post
  placeService.NewPost = function() {
    var entry = {};
    
    entry._id = uuid.v4();
    entry.Latitude = null;
    entry.Longitude = null;
    entry.Name = null;
    entry.Description = null;
           
    return entry;
  };
  
   placeService.SavePost = function(entry) {
    var deferred = $q.defer();

    if (entry != null) {
      //if null then a new post
      if (entry._id == null) {
        entry._id = uuid.v4();

        placeService.db.post(entry)
        .then(function(output) {
          placeService.Broadcast.Send('PlaceSaved', entry);
          
          return deferred.resolve(output);
        });
      } else {
        //Try to load the post
        placeService.GetPost(entry._id)
        .then(function(doc) {
          if (doc != null) {
            //found the post so pull the rev out of it and
            //put it on the post
            entry._rev = doc._rev;
            
            //Save the post to db
            placeService.db.put(entry)
            .then(function(output) {
              placeService.Broadcast.Send('PlaceSaved', entry);
              
              deferred.resolve(output);
            });
          } else {
            //not found so a new post
            placeService.db.post(entry)
            .then(function(output) {
              placeService.Broadcast.Send('PlaceSaved', entry);
              
              deferred.resolve(output);
            });
          }
        });   
      }
    }
    
    return deferred.promise;   
  };
  
}]);