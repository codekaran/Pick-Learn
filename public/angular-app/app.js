angular.module('myApp',['ngRoute','angular-jwt']).config(config).run(run);

function config($routeProvider,$httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
	$routeProvider
			.when('/',{
				templateUrl:'angular-app/webPages/home.html'
			})
			.when('/teacherlist',{
				templateUrl : 'angular-app/webPages/CSE.html',
				controller : 'TeacherController',
				controllerAs : 'vm',
				access:{
					restricted : true
				}
			})
			.when('/votedone',{
				templateUrl:'angular-app/webPages/votedone.html',
				
				access:{
					restricted : true
				}
			})
			.when('/register',{
				templateUrl : 'angular-app/webPages/register.html',
				controller : 'registerController',
				controllerAs : 'vm',
				access:{
					restricted : false
				}
			})
			.when('/alotted',{
				templateUrl : 'angular-app/webPages/alotted.html',
				controller : 'alotController',
				controllerAs : 'vm'
			})
			.when('/otpverification',{
				templateUrl : 'angular-app/webPages/otpverification.html',
				controller : 'otpController',
				controllerAs : 'vm'
			})
			.when('/elective',{
				templateUrl:'angular-app/webPages/elective.html',
				controller:'electiveController',
				controllerAs:'vm',

				access :{
					restricted : true

				}
			})
			.otherwise({
				redirectTo: '/'
			});

}


function run($rootScope,$location,$window,AuthFactory){
	$rootScope.$on('$routeChangeStart',function(event,nextRoute,currentRoute){
		if(nextRoute.access !==undefined && nextRoute.access.restricted && !window.sessionStorage.token && !AuthFactory.isLoggedIn){
			event.preventDefault();
			console.log("path restricted");
			$location.path('/');
		}  
	});
}