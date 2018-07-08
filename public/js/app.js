angular.module("backend-project", ['ui.router'])
.config(function($locationProvider, $stateProvider, $urlRouterProvider){

	$stateProvider    
		.state('page', {
		    url: '',
		    abstract: true,
		    views:{
		      'nav':{
		        templateUrl: '../views/nav.html',
		        controller: 'pageNavController'
		      },
		      'footer':{
		        templateUrl: '../views/footer.html'
		      }
		    }

		})
		.state('page.main', {
	        url: '/',
	        block: false, 
	        views:{  
	          'container@':{
	            templateUrl: '../views/page_main.html'	           
	          }
	       }
	    });
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: true
	});
	$urlRouterProvider.otherwise('/');

})