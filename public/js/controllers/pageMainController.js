angular.module("backend-project")
.controller('pageMainController', function($scope, $mdDialog, $http) {	
	
	$scope.urls = [];
	//Get the hostname
	var url = window.location.href;
	var arr = url.split("/");
	$scope.host = arr[0] + "//" + arr[2];
	//-----------------------------------------

	//Show the dialog to shorten urls
	$scope.showAdd = function(ev) {
	    $mdDialog.show({
			controller: AddDialogController,
			templateUrl: 'views/add_url.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
	    })
	    .then(function(answer) {
	    	console.log('You said the information was "' + answer + '".');
	    	if (answer) {
	    	}
          
        }, function() {
        	console.log('You cancelled the dialog.');
        });
	};

	function getHost(){
		return $scope.host;
	}

	function AddDialogController($scope, $mdDialog) {
		$scope.item={};
		$scope.selectedIndex = 0;
		$scope.isSending = false;

		//Send url to be shortened		
		$scope.sendData = function() {
			if ($scope.selectedIndex == 0) {
				if ($scope.item.realURL) {
					$scope.isSending = true;
					$http.post("/api/url/", $scope.item).then(
						function(response){
							console.log(response);
							$mdDialog.hide(true);
							$scope.isSending = false;
							//Show url shortened
							swal({
							    type: 'success',
							    title: 'Shortened url',
							    confirmButtonColor: "#FFC107",
								confirmButtonText: "Accept",
							    html: ''+getHost()+"/"+response.data.codeURL
							});						
						},
						function(response){
							$scope.isSending = false;
							console.log(response);		                
			                swal({
							    type: 'error',
							    title: 'Error',
							    confirmButtonColor: "#FFC107",
								confirmButtonText: "Accept",
							    html: ''+((response.data && response.data.message) ? response.data.message : "Server error.")
							});
						}
					);
				}else{
					swal({
					    type: 'warning',
					    title: 'Warning',
					    confirmButtonColor: "#FFC107",
						confirmButtonText: "Accept",
					    html: 'Missing required fields.'
					});
				}
				
			}
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}

});