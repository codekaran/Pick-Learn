

angular.module('myApp').controller('registerController',registerController);


function registerController($http,$location){
	var vm = this;
	vm.verified = false;
	vm.otpVerified = false;
	var val = Math.floor(1000 + Math.random() * 9000);
	vm.passwordChanged = false;



	vm.check = function(){
		
		if(!vm.name||!vm.pass||!vm.id){
			vm.error = 'please enter a username and password';
			vm.verified = false;
		}

		else if(vm.pass !== vm.repass){
				vm.error = 'plz make sure that the password match';
				vm.verified = false;
			}
		else if(vm.myForm.$invalid){
				vm.error = 'plz insert a valid no.';
				vm.message = '';
				vm.verified = false;
			}
			else{
				vm.error='';
				$http.get('/api/twilio?random='+val).then(function(result){
					console.log(result.status);
				}).catch(function(error){
					console.log(error);
				});
				vm.message='Please enter 4 digit OTP to verify';
				vm.verified = true;

				
			}

};

	vm.otpVerify = function(){

				if(vm.otp==val){
					vm.otpVerified = true;
					vm.message = "OTP verified Click submit to register";
				}
				else{
					vm.error = "Worng OTP";
				}
};

	vm.add = function(){
		
		var student={
			name:vm.name,
			pass:vm.pass,
			id:vm.id,
			mobile:vm.mobile

		};



			if(vm.verified && vm.otpVerified)
			{
				
				$http.post('/api/student/register',student).then(function(result){

					console.log(result.status);
					if(result.status==204)
					{
						vm.message = "You are successfully registered!! Login and vote teachers";
					    vm.error='';
					    vm.passwordChanged=true;
					}

				}).catch(function(error){
					if(error.status==400)
						{
							vm.error = 'please enter valid Name and ID';
							vm.message="";
							console.log("Name and id mismatch");
						}

				});
			}
			else{
				vm.error='please refresh the  page and try again';
			}
		};


}