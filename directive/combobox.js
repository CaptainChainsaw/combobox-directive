angular.module('comboBoxDirective', [])

.directive('comboBox', function() {
  return {
    restrict: 'AE',
    //require: '^ngModel',
    
    scope: {
        url: '@',
		listName: '@',
		loadingMessage: '@',
		comboBoxDirectiveSelectedValues: "="
    },

    controller: ['$scope', '$http', function($scope, $http) {
        $scope.selectedValues=[];
		$scope.values=[];
		
		
        $scope.getData = function () {
			$scope.valuesBusy=true;
             $http({
             // method: 'JSONP',
              url: $scope.url
            }).success(function(data) {
				$scope.initSelectedValues(data);
				$scope.valuesBusy=false;
            });
        }

		$scope.initSelectedValues = function (data) {
			for(var i=0; i<data.length; i++){
				$scope.selectedValues.push(data[i].value)
				$scope.values.push(data[i])
			}
		}
		
		$scope.selectAllValues = function () {
			$scope.selectedValues = _.pluck($scope.values, 'value');
			$scope.getSelectedValues();
		};
		$scope.deselectAllValues = function () {
			$scope.selectedValues = [];
			$scope.getSelectedValues();				
		};
		
		$scope.setSelectedValues = function (item) {
			var value = item.value;

			if (_.contains($scope.selectedValues, value)) {
				$scope.selectedValues = _.without($scope.selectedValues, value);
			} else {
				$scope.selectedValues.push(value);
			}
			
			$scope.getSelectedValues();
			
			return false;
		};
		
		$scope.isCheckedValues = function (value) {
			if (_.contains($scope.selectedValues, value)) {
				return 'exc-icon-ok pull-right';
			}
			return false;
		};		

		$scope.getSelectedValues = function () {
			return $scope.selectedValues;
		}
		
    }],  
      
     link: function(scope, iElement, iAttrs, ctrl) {
         scope.getData();

         scope.getSelectedValues = function(){ // get the selected values back to the parent scope (for filtering)
			scope.comboBoxDirectiveSelectedValues(scope.selectedValues);
    	 }
     },
	 
	 templateUrl: '../directive-template/combobox-template.html'
  }
})