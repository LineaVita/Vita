vitaApp.factory('configurationService', 'pouchDB', '$q', 
  function(pouchDB, $q) {
    var configurationService = {};
  
    configurationService.db = pouchDB;
  
    configurationService.Load = function() {
      var deferred = $q.defer();      
      
      
      
      return deferred.promise;
    };
  
    configurationService.Save = function(configuration) {
      var deferred = $q.defer();      
      
      
      
      return deferred.promise;
    };
    
    configurationService.GetSettings = function() {
      var deferred = $q.defer();      
      
      
      
      return deferred.promise;
    }

    return configurationService;
  });