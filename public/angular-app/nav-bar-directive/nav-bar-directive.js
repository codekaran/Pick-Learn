angular.module('myApp').directive('myNavigation',myNavigation);


function myNavigation(){
	return{
		restrict:'E',
		templateUrl:'angular-app/webPages/nav-bar.html'
	};
}