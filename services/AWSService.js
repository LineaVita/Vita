vitaApp.factory('awsService', ['$rootScope', '$q', '$mdToast', 'ConfigurationService',
function($rootScope, $q, $mdToast, configService) {
  var awsService = {};
   
  awsService.Enabled = false;
  awsService.rootScope = $rootScope;
  awsService.ConfigService = configService;
  awsService.S3 = {};
  
  //TODO - Move to somewhere more appropriate (ToastService?)
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true 
    };
  awsService.toastPosition = angular.extend({},last);
  awsService.getToastPosition = function() {
    awsService.sanitizePosition();
    return Object.keys(awsService.toastPosition)
      .filter(function(pos) { return awsService.toastPosition[pos]; })
      .join(' ');
  };
  awsService.ShowToast = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position(awsService.getToastPosition())
        .hideDelay(3000)
    );
  };
  
  awsService.sanitizePosition = function sanitizePosition() {
    var current = awsService.toastPosition;
    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;
    last = angular.extend({},current);
  }
  
  //TODO load
  awsService.UseAws = true;
  awsService.Credentials = {};  
  awsService.Configuration = {};
    
  awsService.getConfig = function() {
    awsService.ConfigService.LoadConfiguration()
    .then(function(config) {
      awsService.Configuration = config; 
      awsService.ConfigureS3();
    });    
  }
  
  awsService.ConfigureS3 = function() {
    awsService.Credentials = {
      accessKeyId: awsService.Configuration.AWSKey, 
      secretAccessKey: awsService.Configuration.AWSSecret };
       
    awsService.Enabled = true;
    //TODO mark as ready and deal with stuff that came in before ready.
    //Check in database for new records? 
    
    //TODO verify that we can list the bucket
  }
  
  awsService.ListBucket = function(){
    var deferred = $q.defer();
    
    //TODO add code to list bucket
    
    return deferred.promise;
  }
  
  awsService.UploadFile = function(objectType, filename, filetype, file) {
    // Configure The S3 Object 
    AWS.config.update(awsService.Credentials);
    AWS.config.region = awsService.Configuration.AWSRegion;
    
    var bucket = new AWS.S3({ params: { Bucket: awsService.Configuration.AWSBucketName } });

    if (file) {
      var params = { Key: filename, ContentType: filetype, Body: file, ServerSideEncryption: 'AES256' };

      bucket.putObject(params, function(err, data) {
        if(err) {
          // There Was An Error With Your S3 Config
          alert(err.message);
          return false;
        }
        else {
          // Success!
          awsService.ShowToast('Uploaded ' + objectType + ' to aws')
        }
      })
      .on('httpUploadProgress',function(progress) {
            // Log Progress Information
            console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
       });
    }
    else {
      // No File Selected
      alert('No File Selected');
    }
  }
    
  awsService.SavePost = function(post) {
    if (awsService.Enabled) {
      if (post != null) {
        var filename = "posts/" + post._id + '.json';
        var filetype = "application/json";
        var body = JSON.stringify(post);

        awsService.UploadFile('post', filename, filetype, body);
      }
    }
  };
  
  awsService.SaveFile = function(fileId, extension, filetype, file) {
    if (awsService.Enabled) {
      if (file != null) {
        var filename = "files/" + fileId + '.' + extension;
        
        awsService.UploadFile('file', filename, filetype, file);
      }
    }
  };
  
  awsService.SaveFriend = function(friend) {
    if (awsService.Enabled) {
      if (friend != null) {
        var filename = "friends/" + friend._id + '.json';
        var filetype = "application/json";
        var body = JSON.stringify(friend);

        awsService.UploadFile('friend', filename, filetype, body);
      }    
    }
  };
  
  awsService.DeleteFriend = function(friend) {
   if (awsService.Enabled) {
      if (friend != null) {
        //TODO delete the file?  Or move it to deleted?
      }
    }    
  };
  
  awsService.DeletePost = function(post) {
   if (awsService.Enabled) {
      if (post != null) {
        //TODO delete the file?  Or move it to deleted?
      }
    }
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
  
  $rootScope.$on('FileSaved', function(event, fileId, extension, filetype, file){
    if (awsService.UseAws) {
      awsService.SaveFile(fileId, extension, filetype, file);
    }    
  });
  
  $rootScope.$on('FileDeleted', function(event, file){
    if (awsService.UseAws) {
      awsService.DeleteFile(file);
    }    
  });
  
  awsService.getConfig();
    
  // factory function body that constructs shinyNewServiceInstance
  return awsService;
}]);