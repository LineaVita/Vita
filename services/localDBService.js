vitaApp.factory('localDbService', function(pouchDB) {
  var localDbService;
  
  var db = pouchDB('name');

  return localDbService;
});
