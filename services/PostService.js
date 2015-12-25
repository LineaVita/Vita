vitaApp.factory('PostService', ['uuid', 'pouchDB', '$q', 
function(uuid, pouchDB, $q) {
  var postService = {};
  
  //Setup the database for friends
  postService.db = pouchDB("posts");
  
  //Save ref to uuid
  postService.uuid = uuid;
  
  //Save the post to the database
  postService.SavePost = function(post) {
    var deferred = $q.defer();

    if (post != null) {
      //if null then a new post
      if (post._id == null) {
        post._id = uuid.v4();

        postService.db.post(post)
        .then(function(output) {
          return deferred.resolve(output);
        });
      } else {
        //Try to load the post
        postService.db.get(post._id)
        .then(function(doc) {
          if (doc != null) {
            //found the post so pull the rev out of it and
            //put it on the post
            post._rev = doc._rev;
            
            //Save the post to db
            postService.db.put(post)
            .then(function(output) {
              return deferred.resolve(output);
            });
          } else {
            //not found so a new post
            postService.db.post(post)
            .then(function(output) {
              return deferred.resolve(output);
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });   
      }
    }
    
    return deferred.promise;   
  }
  
  
  
  
  return postService;  
}]);