angular.module ('restapi', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'views/add.html',
		controller:'addCtrl'
	})
	.when('/signup', {
		templateUrl:'views/signup.html',
		controller:'loginCtrl'
	})
	.when('/login', {
		templateUrl:'views/login.html',
		controller:'loginCtrl'
	})
	.when('/list', {
		templateUrl:'views/list.html',
		controller:'listCtrl'
	})
	.when('/test', {
		templateUrl:'views/test.html',
	})
	

})

.run(function($http, $rootScope){
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('/');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';

	}
})




