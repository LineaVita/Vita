vitaApp.factory('FriendService', ['uuid', 'pouchDB', '$q', 
function(uuid, pouchDB, $q) {
  var friendService = {};
  
  //Setup the database for friends
  friendService.db = pouchDB("friends");
  
  //Save ref to uuid
  friendService.uuid = uuid;
  
  //Add the getFriends method
  friendService.getFriends = function() {
    var deferred = $q.defer();

    friendService.db.allDocs({ include_docs: true, attachments: true })
      .then(function(docs){
        var output = [];

        for (i = 0, len = docs.rows.length; i < len; i++) { 
            output.push(docs.rows[i].doc);
        }

        return deferred.resolve(output);
      });

    return deferred.promise;
  };
  
  //Create a new friend
  friendService.newFriend = function(){
    var friend = {};
    friend._id = friendService.uuid.v4();
    friend.FirstName = "";
    friend.LastName = "";
    friend.Email = "";
    friend.Twitter = "";
    friend.BirthDate = null;

    return friend;
  };

  //Load a friend from database
  friendService.loadFriend = function(id) {
    var deferred = $q.defer();

    friendService.db.get(id)
      .then(function(doc) {
        return deferred.resolve(doc);         
      });

    return deferred.promise;
  };
  
  //Save a friend to the database
  friendService.saveFriend = function (friend) {
    var deferred = $q.defer();

    if (friend != null) {
      if (friend._id == null) {
        friend._id = uuid.v4();

        friendService.db.post(friend)
          .then(function(output) {
            return deferred.resolve(output);
          });
      } else {
        friendService.db.get(friend._id)
        .then(function(doc) {
          if (doc != null) {
            friendService.db.put(friend)
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
  
  return friendService;
}]);