vitaApp.factory('awsService', ['$rootScope',
function($rootScope) {
  var awsService = {};
  
  awsService.rootScope = $rootScope;
  
  //TODO load
  awsService.UseAws = true;
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
    if (awsService.UseAws) {
      awsService.SaveFriend(friend);
    }    
  });
  
  $rootScope.$on('FriendDeleted', function(event, friend){
    if (awsService.UseAws) {
      awsService.DeleteFriend(friend);
    }    
  });
  
  $rootScope.$on('PostSaved', function(event, post){
    if (awsService.UseAws) {
      awsService.SavePost(post);
    }    
  });
  
  $rootScope.$on('PostDeleted', function(event, post){
    if (awsService.UseAws) {
      awsService.DeletePost(post);
    }    
  });
  
  
  // factory function body that constructs shinyNewServiceInstance
  return awsService;
}]);