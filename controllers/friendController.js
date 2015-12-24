vitaApp.controller('friendController', ['$scope', '$location', 'uuid', 'pouchDB', '$q',
  function($scope, $location, uuid, pouchDB, $q) {
    var db = pouchDB("friends");
    
    $scope.newFriend = function(){
      var friend = {};
      friend._id = uuid.v4();
      friend.FirstName = "";
      friend.LastName = "";
      friend.Email = "";
      friend.Twitter = "";
      friend.BirthDate = null;

      return friend;
    }

    $scope.loadFriend = function(id) {
      var deferred = $q.defer();
      
      db.get(id)
        .then(function(doc) {
          return deferred.resolve(doc);         
        });
      
      return deferred.promise;
    }

    $scope.saveFriend = function (friend) {
      var deferred = $q.defer();
      
      if (friend != null) {
        if (friend._id == null) {
          friend._id = uuid.v4();
          
          db.post(friend)
            .then(function(output) {
              return deferred.resolve(output);
            });
        } else {
          db.get(friend._id)
          .then(function(doc) {
            if (doc != null) {
              db.put(friend)
                .then(function(output) {
                  return deferred.resolve(output);
                });
            }
          })
          .catch(function (err) {
            console.log(err);
          });   
        }
        
        return deferred.promise;   
      }
    }
    
    $scope.saveAndRedirect = function(friend) {
      $scope.saveFriend(friend)
        .then(function (output) {
          $location.path('/friends');
        });           
    }
    
}]);