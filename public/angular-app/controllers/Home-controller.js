angular.module('myApp').controller('HomeController',HomeController);

function HomeController($http,AuthFactory,$window,$location,jwtHelper){
	var vm = this;
	
	window.onbeforeunload=function(){
		vm.logout();

	};

	vm.isLoggedIn = function(){
		if(AuthFactory.isLoggedIn){
			return true;
		}
		else{
			return false;
		}
	}
	vm.error = false;

	vm.login = function(){

		if(vm.password && vm.id){
			var student = {
				id : vm.id,
				password : vm.password
			};

			$http.post('/api/student/login',student).then(function(response){
				$window.sessionStorage.token = response.data.token;
				AuthFactory.isLoggedIn = true;
				vm.errorMsg=false;
				var token = $window.sessionStorage.token;
				var decodedToken = jwtHelper.decodeToken(token);
				vm.loggedinUser = decodedToken.name;
				vm.isBlocked = decodedToken.blocked;
				vm.hasElected = decodedToken.elective;

				}).catch(function(error){
					vm.errorMsg = true;
					
				console.log(error.data.message);
			});
		}
		else{
			vm.error=true;
		}
	}


	vm.logout = function(){
		alert('you are logging out');
		AuthFactory.isLoggedIn = false;
		delete $window.sessionStorage.token;
		$location.path('/');
	}




}