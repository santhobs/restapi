angular.module ('restapi')

.controller('listCtrl', function($scope, myService){


	myService.getNames().then(function(response) {
    $scope.names = response.data;
  });

})