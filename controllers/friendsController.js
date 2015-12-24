vitaApp.controller('friendsController', ['$scope', '$location', 'pouchDB', '$q',
  function($scope, $location, pouchDB, $q) {
    var db = pouchDB("friends");
                                         
    $scope.getFriends = function() {
      var deferred = $q.defer();
      
      db.allDocs({ include_docs: true, attachments: true })
        .then(function(docs){
          var output = [];

          for (i = 0, len = docs.rows.length; i < len; i++) { 
              output.push(docs.rows[i].doc);
          }

          return deferred.resolve(output);
        });
      
      return deferred.promise;
    }

    $scope.getFriends().then(function(friends) { $scope.Friends = friends });
 
}]);