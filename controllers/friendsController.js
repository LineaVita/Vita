vitaApp.controller('friendsController', ['$scope', '$location', 
  function($scope, $location) {
    
  $scope.getFriends = function(){
    var friends = [{ Id: "895b3103-5d1a-4382-85bd-aedf7b0e5790", FirstName:"Bob", LastName:"Maxwell"}, { Id:"507c3cf4-6524-4e9e-a458-94440b506589" , FirstName:"Joe", LastName:"Maxwell"}];
    return friends;
  }
  
  $scope.Friends = $scope.getFriends();
 
}]);