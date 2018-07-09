angular.module("backend-project")
.controller('pageMainController', function($scope, $mdDialog, $http, Upload) {	
	$scope.isLoading = true;
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
			clickOutsideToClose:false
	    })
	    .then(function(answer) {
	    	
	    	if (answer) {
	    		$scope.isLoading = true;
	    		getURLs();
	    	}
          
        }, function() {
        	console.log('You cancelled the dialog.');
        });
	};

	function getHost(){
		return $scope.host;
	}

	function getURLs(){
		$http.get("/api/url/", $scope.item).then(
			function(response){
				$scope.urls = angular.copy(response.data);
				$scope.isLoading = false;
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
	}

	function AddDialogController($scope, $mdDialog) {
		$scope.item={};
		$scope.selectedIndex = 0;
		$scope.file = null;
		$scope.isSending = false;

		//Send url to be shortened		
		$scope.sendData = function() {
			console.log("SE ENVIA");
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
				
			}else{
				if ($scope.file) {
					$scope.isSending = true;
					
					Upload.upload({
						url: "/api/url/bulk/",
						data: {file: $scope.file}
					}).then(function (response) {
						console.log(response);
	                	$mdDialog.hide(true);
						$scope.isSending = false;
						//Show urls shortened
						var html = "";
						for (var i = 0; i < response.data.length; i++) {
							html+= ""+getHost()+"/"+response.data[i].codeURL+"<br>"
						}
						swal({
						    type: 'success',
						    title: 'Shortened urls',
						    confirmButtonColor: "#FFC107",
							confirmButtonText: "Accept",
						    html: html
						});
					},
					function (response) {
						$scope.isSending = false;
						console.log(response);		                
		                swal({
						    type: 'error',
						    title: 'Error',
						    confirmButtonColor: "#FFC107",
							confirmButtonText: "Accept",
						    html: ''+((response.data && response.data.message) ? response.data.message : "Server error.")
						});
					});
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
		$scope.selectedFile = function(file, errFiles){
			if (file && file.size > 4000000) {
				swal({
				    type: 'error',
				    title: 'Error',
				    confirmButtonColor: "#ea0437",
					confirmButtonText: "Aceptar",
				    html: "El archivo tiene un peso mayor a 4MB."
				});
			}else{
				
				$scope.file = file;

			}
			
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
	getURLs();

});