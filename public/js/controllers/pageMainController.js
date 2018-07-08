angular.module("backend-project")
.controller('pageMainController', function($scope, $mdDialog) {
	$scope.urls = [];
	$scope.showAdd = function(ev) {
	    $mdDialog.show({
			controller: AddDialogController,
			templateUrl: 'views/add_url.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
	    })
	    .then(function(answer) {
	    	if (answer) {
	    		$scope.status = 'You said the information was "' + answer + '".';
	    	}
          
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
	};

	function AddDialogController($scope, $mdDialog) {
		$scope.item={};
		$scope.selectedIndex = 0;

		$scope.sendData = function() {
			
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}

});