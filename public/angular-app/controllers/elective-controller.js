angular.module('myApp').controller("electiveController",electiveController);


function electiveController($http,$location,$window,jwtHelper){
	var vm = this;
	vm.error = false;
	vm.success = false;
	var token;
	var stu_id;
	if($window.sessionStorage.token){
		token = jwtHelper.decodeToken($window.sessionStorage.token);
		
		stu_id = token.stu_id;
	}

	$http.get('/api/elective').then(function(res){
		vm.electiveList = res.data;
		console.log(res);
	}).catch(function(error){
		console.log(error);
	});


	vm.add = function(){
		
		if(vm.get){
		$http.put('/api/elective/'+vm.get+'?studentId='+stu_id).then(function(res){
		vm.electiveList = res.data;
		vm.success= true;
		vm.error  = false;
		console.log(res);
		
		$http.get('/api/refreshToken/'+token.id).then(function(res){
			console.log("refreshed");
				$window.sessionStorage.token = res.data.token;
				AuthFactory.isLoggedIn = true;
		}).catch(function(error){
			console.log(error);
		});
		$location.path('/');
	}).catch(function(error){
		console.log(error);
	});
}
	else{
		vm.error=true;
	}

	};
	vm.update = function(){
		console.log(vm.get);
	};
}