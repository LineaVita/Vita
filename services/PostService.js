vitaApp.factory('PostService', ['uuid', 'pouchDB', '$q', 
function(uuid, pouchDB, $q) {
  var postService = {};
  
  //Setup the database for friends
  postService.db = pouchDB("postings");
  
  //Create an index for dates
  postService.db.createIndex({ index: { fields: ['DateTime'] }});
  
  //Save ref to uuid
  postService.uuid = uuid;
  
  //Save the post to the database
  postService.SavePost = function(entry) {
    var deferred = $q.defer();

    if (entry != null) {
      //if null then a new post
      if (entry._id == null) {
        entry._id = uuid.v4();

        postService.db.post(entry)
        .then(function(output) {
          return deferred.resolve(output);
        });
      } else {
        //Try to load the post
        postService.GetPost(entry._id)
        .then(function(doc) {
          if (doc != null) {
            //found the post so pull the rev out of it and
            //put it on the post
            entry._rev = doc._rev;
            
            //Save the post to db
            postService.db.put(entry)
            .then(function(output) {
              deferred.resolve(output);
            });
          } else {
            //not found so a new post
            postService.db.post(entry)
            .then(function(output) {
              deferred.resolve(output);
            });
          }
        });   
      }
    }
    
    return deferred.promise;   
  };
  
  //Get a specific post from the database
  postService.GetPost = function(id) {
    var deferred = $q.defer();
    
    postService.db.get(id)
    .then(function(doc) {
      deferred.resolve(doc);
    })
    .catch(function (err) {
      deferred.resolve(null);         
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
    
    postService.db.find({
      selector: {
        $and: [
          { DateTime: { $gte: startDate } },
          { DateTime: { $lte: endDate } }
        ],
        sort: [ {DateTime: 'desc'} ]    
      }
    })
    .then(function(posts) {
        //loop through and just return the actual posts.
        var output = [];
    
        if (posts != null 
            && posts.rows != null) {
          for (i = 0, len = posts.rows.length; i < len; i++) { 
              output.push(posts.rows[i].doc);
          }
        }

        deferred.resolve(output);
    })
    .catch(function (err) {
      deferred.resolve(null);         
    });
    
    return deferred.promise; 
  }  
  
  postService.NewPost = function() {
    var entry = {};
    
    entry.PostDateTime = Date.now();   
    entry.Text = "";
       
    return entry;
  };
  
  return postService;  
}]);