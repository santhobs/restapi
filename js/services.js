angular.module ('restapi')


.factory('myService', function($http, $q) {

  // var deferred = $q.defer();
  // var data = [];
  // var myService = {
  // 	async:function(){
  // 		$http.get('/hello').success(function(response){
  // 			data = response;
  // 			deferred.resolve();
  // 		});
  // 		return deferred.promise;
  // 	},
  // 	data:function(){
  // 		return data;
  // 	}

  // };
  // return myService;

  var factory = {};
  factory.getNames = function(){
    return $http.get('/hello');
  }
  return factory;
});