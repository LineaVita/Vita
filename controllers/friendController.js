vitaApp.controller('friendController', ['$scope', '$location', 
  function($scope, $location) {
    
  $scope.newFriend = function(){
    var friend = {};
    friend.Id = "";
    friend.FirstName = "";
    friend.LastName = "";
    friend.Email = "";
    friend.Twitter = "";
    friend.BirthDate = null;
        
    return friend;
  }
  
  $scope.loadFriend = function() {
    
  }
  
  $scope.saveFriend = function (friend) {
    //TODO - add logic to save
    
    $location.path('/friends');
  }
  
  
 
}]);