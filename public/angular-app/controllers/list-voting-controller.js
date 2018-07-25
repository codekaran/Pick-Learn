angular.module('myApp').controller('TeacherController',TeacherController);



// list display controller

function TeacherController($http,$location,jwtHelper,$window,AuthFactory){
	var vm = this;


	var z=0;
	var sub=[];
	var token;
	var currentVoted = false;
	vm.afterLoad=function(){



	if($window.sessionStorage.token){
	token = jwtHelper.decodeToken($window.sessionStorage.token);

	if(!token.blocked){
	$http.get('/api/teacherlist?branch='+token.branch).then(function(res){
		console.log(res.data);
		
		vm.list = res.data;
		var arr= vm.list;
		
		sub[0]=arr[0].subject;
		var c=0;
		for(var i=0;i<arr.length;i++){
			if(sub[c]!=arr[i].subject){

				c++;
				sub[c]=(arr[i].subject);


			}
		}

 	vm.subject = sub[z];


	}).catch(function(error){
		console.log(error.status);
	});
}
else{
	
	$location.path('/');
}
}
else{
	$location.path('/');
}
}
	vm.getResponse = function(){
	
		if(z<sub.length-1 && vm.get){
		$http.put('/api/teacherlist/'+vm.get+'?sec='+token.section).then(function(res){
		console.log(res.data);
	}).catch(function(error){
		console.log(error.status);
	});
		z++;
		vm.get=null;
		vm.subject = sub[z];

	
	}

	else if(z==sub.length-1 && vm.get!=null){
		$location.path('/');
		$http.put('/api/student/voted/'+token.id).then(function(res){
			console.log("student blocked")
			if(res){
				AuthFactory.isLoggedIn = false;
		delete $window.sessionStorage.token;

		$http.get('/api/refreshToken/'+token.id).then(function(res){
			console.log("refreshed");
				$window.sessionStorage.token = res.data.token;
				AuthFactory.isLoggedIn = true;
		}).catch(function(error){
			console.log(error);
		});
			}
		}).catch(function(error){
			console.log(error.status);
		});
		
	}
	}
		vm.radioChange=function(){
			console.log(sub);
			console.log(vm.get);
		}



}


