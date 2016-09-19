angular.module ('restapi')


.controller('addCtrl', function($scope, $http, myService){

    // Call the async method and then do stuff with what is returned inside our own then function
    myService.getNames().then(function(response) {
    $scope.names = response.data;
  });


	


	var refresh = function(){
		$http.get('/hello').success(function(response){
			$scope.names = response;
			$scope.newNames = "";
		})
	};
	$scope.save = function(){
		$http.post('/hello', $scope.newNames).then(function(response){
		$scope.names.push(response.data);
		$scope.newNames = {fname: '', lname: ''};
	})};

	$scope.dlall = function(){
		$http.delete('/hello').success(function(response){
			console.log('Success');
			
	})

		refresh();
	};

	$scope.dlte = function(id){
		$http.delete('/hello/' + id).success(function(response){
			console.log('Success');
			
	})
	refresh();
	};	

	$scope.edit = function(id){
		console.log(id);
		$http.get('/hello/' + id).success(function(response){
		
		$scope.newNames = response;
	});
	};

	$scope.update = function(){

	$http.put('/hello/' + $scope.newNames._id, $scope.newNames).success(function(response){
		
		$scope.names = response;


	});
	refresh();
};






})