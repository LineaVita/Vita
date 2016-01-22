vitaApp.factory('ToastService', ['$mdToast', 
function($mdToast) {
  var toastService = {};
  
  toastService.Last = {
      bottom: false,
      top: true,
      left: false,
      right: true 
    };
  
  toastService.toastPosition = angular.extend({}, toastService.last);
  
  toastService.getToastPosition = function() {
    toastService.sanitizePosition();
    return Object.keys(toastService.toastPosition)
      .filter(function(pos) { return toastService.toastPosition[pos]; })
      .join(' ');
  };
  
  toastService.ShowToast = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position(toastService.getToastPosition())
        .hideDelay(3000)
    );
  };
  
  return toastService;
}]);