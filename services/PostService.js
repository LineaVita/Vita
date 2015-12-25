vitaApp.factory('PostService', ['uuid', 'pouchDB', '$q', 
function(uuid, pouchDB, $q) {
  var postService = {};
  
  //Setup the database for friends
  postService.db = pouchDB("posts");
  
  //Create an index for dates
  postService.db.createIndex({ index: { fields: ['DateTime'] }})
  .then(function (result) {
      // yo, a result
    }).catch(function (err) {
      // ouch, an error
    });
  
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
  };
  
  //Get a specific post from the database
  postService.GetPost = function(id) {
    var deferred = $q.defer();
    
    postService.db.get(post._id)
    .then(function(doc) {
      deferred.resolve(doc);
    });
        
    return deferred.promise; 
  };
  
  //Returns posts for a recent period of time (90 days)
  postService.GetRecentPosts = function() {
    var deferred = $q.defer();
    
    var now = new Date();
    var start = new Date();
    start.setDate(start.getDate() - 90);
    
    postService.GetPostsInRange(start, now)
    .then(function(posts) {
      deferred.resolve(posts);
    });
        
    return deferred.promise;  
  };
  
  //Returns posts in a time period
  postService.GetPostsInRange = function(startDate, endDate) {
    var deferred = $q.defer();
    
    db.find({
      selector: {
        $and: [
          { DateTime: { $gte: startDate } },
          { DateTime: { $lte: endDate } }
        ],
        sort: [ {DateTime: 'desc'} ]    
      }
    })
    .then(function(posts) {
        var output = [];

        for (i = 0, len = posts.rows.length; i < len; i++) { 
            output.push(posts.rows[i].doc);
        }

        return deferred.resolve(output);
    });
    
    return deferred.promise; 
  }  
  
  return postService;  
}]);