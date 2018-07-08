angular.module("backend-project")
.controller('pageRedirectController', function($scope,$stateParams, $http) {		

	$http.get("/api/url/"+$stateParams.code, $scope.item).then(
		function(response){
			window.location.href = response.data.realURL;
		},
		function(response){
			swal({
			    type: 'error',
			    title: 'Error',
			    confirmButtonColor: "#FFC107",
				confirmButtonText: "Accept",
			    html: ''+((response.data && response.data.message) ? response.data.message : "Server error.")
			});
		}
	);
});