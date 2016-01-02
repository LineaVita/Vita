vitaApp.factory('awsService', ['$rootScope',
function($rootScope) {
  var awsService = {};
  
  awsService.rootScope = $rootScope;
  
  //TODO load
  awsService.AwsKey = "";
  awsService.SecretKey = "";
  awsService.Bucket = "";
    
  awsService.SavePost = function(post) {
    
  };
  
  awsService.SaveFriend = function(friend) {
    
  };
  
  awsService.DeleteFriend = function(friend) {
    
  };
  
  awsService.DeletePost = function(post) {
   
  };
  
    
  $rootScope.$on('FriendSaved', function(event, friend){
    //Save friend to aws
  });
  
  $rootScope.$on('FriendDeleted', function(event, friend){
    //Save friend to aws
  });
  
  $rootScope.$on('PostSaved', function(event, post){
    //Save Post to aws
  });
  
  $rootScope.$on('FriendDeleted', function(event, post){
    //Save Post to aws
  });
  
  
  // factory function body that constructs shinyNewServiceInstance
  return awsService;
}]);