vitaApp.factory('configurationService', 'pouchDB', '$q', 
  function(pouchDB, $q) {
    var configurationService = {};
  
    //setup the db
    configurationService.db = pouchDB("configuration");
  
    //Load the configuration settings the populate the object
    configurationService.LoadConfiguration = function() {
      var deferred = $q.defer();      
      
      
      
      return deferred.promise;
    };
  
    //Save the settings to the database
    configurationService.SaveConfiguration = function(configuration) {
      var deferred = $q.defer();      
      
      
      
      return deferred.promise;
    };
    
    configurationSerivce.SaveSetting = function(setting) {
      var deferred = $q.defer();      
      
      
      
      return deferred.promise;           
    }
  
  
    configurationService.GetSettings = function() {
      var deferred = $q.defer();      
      
      configurationService.db.allDocs({ include_docs: true, attachments: true })
      .then(function(docs){
        var output = [];

        for (i = 0, len = docs.rows.length; i < len; i++) { 
            output.push(docs.rows[i].doc);
        }

        return deferred.resolve(output);
      });
      
      return deferred.promise;
    }

    return configurationService;
  });