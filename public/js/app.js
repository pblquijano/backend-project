angular.module("backend-project", ["ui.router","ngAnimate","ngResource","ngMaterial"])
.config(function($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider){

	$stateProvider    		
		.state('main', {
	        url: '/', 
	        views:{  
	          'container@':{
	            templateUrl: '../views/page_main.html'	           
	          }
	       }
	    }).state('redirect', {
	        url: '/:code',
	        views:{  
	          'container@':{
	            templateUrl: '../views/page_main.html'	           
	          }
	       }
	    });
	$mdThemingProvider
      .theme("default")
      .primaryPalette("amber", {
        default: "500",
        "hue-1": "300"
      })
      .accentPalette("blue", {
        default: "500",
        "hue-1": "300"
      });
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: true
	});
	$urlRouterProvider.otherwise('/');

})