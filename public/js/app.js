angular.module("backend-project", [])
.config(function($locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: true
	});

})