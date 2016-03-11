var myApp = angular.module('StopWatch');

myApp.controller('StopWatchController', ['$scope', '$interval', function($scope, $interval) {

  // $interval is the Angular wrapper for `window.setInterval`.
  // The reason we want to do this wrapper is that changes that happen to `$scope` inside  
  // the plain `window.setInterval` callback will NOT be automatically applied in the view. 
  // https://docs.angularjs.org/api/ng/service/$interval

  // This is our model object
  // We have bound the `time` property to the html page.
  // Then we have bound the `stop` property to the buttons in the page. 
  $scope.watch = {
    time: 0,
    stop: true
  };

  // Remember why we need this?
  var timerId;

  // You can still define a plain old-fashioned JS function here
  var updateTimeByOneSecond = function() {
    $scope.watch.time++;
  };

  // This is pretty much like the equivalent of `event listener` in Angular.
  // Here we have bound this function to the `#start` button.
  $scope.startWatch = function() {
    timerId = $interval(updateTimeByOneSecond, 1000);
    $scope.watch.stop = false;
  };

  // We have bound this function to the `#stop` button.
  $scope.stopWatch = function() {
    // Try to read the documentaton of angular.isDefined
    // https://docs.angularjs.org/api/ng/function/angular.isDefined
    if (angular.isDefined(timerId)) {
      $interval.cancel(timerId);
      $scope.watch.time = 0;
      $scope.watch.stop = true;
      timerId = undefined;
    }
  };
  
  // This is a nice way to ensure we have destroyed the timer before we move on
  $scope.$on('$destroy', function() {
    $scope.stopWatch();
  });
}]);