vitaApp.factory('ConfigurationService', ['pouchDB', '$q', 
function(pouchDB, $q) {
  var configurationService = {};

  //setup the db
  configurationService.db = pouchDB("configuration");

  //Load the configuration settings the populate the object
  configurationService.LoadConfiguration = function() {
    var deferred = $q.defer();      

    configurationService.GetSettings()
    .then(function(settings) {
      var output = configurationService.NewConfig();

      output.UseAWS = configurationService.FindSetting('UseAWS', settings, false);
      output.AWSKey = configurationService.FindSetting('AWSKey', settings, null);
      output.AWSSecret = configurationService.FindSetting('AWSSecret', settings, null);
      output.AWSBucketName = configurationService.FindSetting('AWSBucketName', settings, null);

      deferred.resolve(output);
    });      

    return deferred.promise;
  };

  //Save the settings to the database
  configurationService.SaveConfiguration = function(configuration) {
    configurationSerivce.SaveSetting('UseAWS', configuration.UseAWS);
    configurationSerivce.SaveSetting('AWSKey', configuration.AWSKey);
    configurationSerivce.SaveSetting('AWSSecret', configuration.AWSSecret);
    configurationSerivce.SaveSetting('AWSBucketName', configuration.AWSBucketName);
  };

  configurationService.NewConfig = function() {
    var config = {};

    config.UseAWS = false;
    config.AWSKey = "";
    config.AWSSecret = "";
    config.AWSBucketName = "";

    return config;
  };

  configurationService.SaveSetting = function(name, value) {
      configurationService.GetSettingByName(name)
      .then(function(setting) {
        if (setting != null) {
          setting.value = value;

          configurationService.db.put(setting);
        } else {
          setting = { _id:name, 'value':value };

          configurationService.db.post(setting);
        }
      });
  };

  configurationService.FindSetting = function(settingName, settings, defaultValue)
  {
    for (i = 0, len = settings.length; i < len; i++) { 
      if (setting.Name == settingName) {
        return setting.Value;    
      }
    }

    return defaultValue;
  };

  configurationService.GetSettingByName = function(name) {
    var deferred = $q.defer(); 

    configurationService.db.get(name)
    .then(function(doc) {
      return deferred.resolve(doc);         
    });

    return deferred.promise;
  };  

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
  };

  return configurationService;
}]);