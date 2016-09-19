angular.module ('restapi')

.controller('loginCtrl', function($scope, $http, $location, $rootScope){


	$scope.user = {username:'', password:''};
	$scope.msg = '';


	$scope.login = function(){
		$http.post('/login', $scope.user).success(function(response){
			if(response.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username;
				console.log(response.user.username);
				$location.path('/');
			} else{
				$scope.msg = response.message;
			}
		})
	};

	$scope.signup = function(){
		$http.post('/signup', $scope.user).success(function(response){
			if(response.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username;
				$location.path('/login');
			} else{
				$scope.msg = response.message;
			}
		})
	};

})