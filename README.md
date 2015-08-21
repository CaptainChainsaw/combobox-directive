# Combobox Directive


This directive when included displays a drop down list of values populated from an external JSON source.  Filtering is simple to implement, the steps below should be enough to get you going with it.

Before going any further with this, here's an example to demonstrate how it works:  http://plnkr.co/edit/FTPdSSiKSOZiWptfJzuC?p=preview


In order to use this directive you will need the following:

 - underscore.js (tested on version 1.8.2)
 
 # Useage

Include the directive:

```sh
<combo-box url="http://democode.6te.net/filterusingdirectives/php/getChemicals.php" list-name="Select Chemicals" loading-message="loading chemicals ..." combo-box-directive-selected-values="getSelectedChemicalValues"></combo-box>
```

# Combobox Attrs

url: Include a url which will return a JSON array, for example:
```sh
[
	{"title":"1 - Acetic acid","value": 1},
	{"title":"2 - Acetone","value": 2},
	{"title":"3 - Acetylene gas","value": 3}
]
```
list-name: This is the name of the list that will appear at the top of the list.  For example "Select Chemicals", or "Select Pet Name" etc.

loading-message: This is the message that will display until the options have finished loading.


# How to use directive for filtering

The example below uses two directives (and it should work for any number of directives on the same page).

Each combo-box directive must be within its own controller and each of these controllers must be within another controller which has access to the data to be filtered on.

The ng-repeat has pipe delimited filters.  These take the form:  filter:selectedValues | filter:selectedValues

```sh
<div ng-controller="resultsCtrl">
	<div ng-controller="chemicalsCtrl">
	 	<combo-box url="http://democode.6te.net/filterusingdirectives/php/getChemicals.php" list-name="Select Chemicals" loading-message="loading chemicals ..." combo-box-directive-selected-values="getSelectedChemicalValues"></combo-box>
	</div>
	<div ng-controller="concentrationCtrl">	
	 	<combo-box url="http://democode.6te.net/filterusingdirectives/php/getConcentration.php" list-name="Select Concentration" loading-message="loading concentration values ..." combo-box-directive-selected-values="getSelectedConcentrationValues"></combo-box>
	</div>

	<div ng-repeat="result in results | chemicalsFilter:selectedChemicalValues | concentrationFilter:selectedConcentrationValues">
 					concentrationId:	{{result.concentrationId}}
 					<br />
 					chemicalId: {{result.chemId}}
 					<br />
 					name: {{result.name}}
 					<br /><br />
 	</div>
</div>	
```

# Example app.js

All that's happening here is that the controllers get the selected options data from the directive and emits it to the parent controller in this case resultsCtrl.  Listeners within resultsCtrl the assign it to $scope which is then accessible by the filters.

This example has some hard coded values for the results, this would normally come from an external JSON source.  Also the selected values are set with an array, this is simply to show them on page load.  Specifically these lines:
```sh
		$scope.selectedChemicalValues = [1,2,3];
		$scope.selectedConcentrationValues = [4,5,6];
```

Full app.js example:
```sh
	var app = angular.module('app', ['comboBoxDirective'])

	.controller('resultsCtrl', function($scope){
		$scope.results = [
						{'chemId': 1, 'concentrationId': 4, 'name' : '1 - Acetic acid'}, 
						{'chemId': 2, 'concentrationId': 5, 'name' : '2 - Acetone'}, 
						{'chemId': 3, 'concentrationId': 6, 'name' : '3 - Acetylene gas'}                      
						];
		
		$scope.selectedChemicalValues = [1,2,3];
		$scope.selectedConcentrationValues = [4,5,6];

		// listen for the event in the relevant $scope
		$scope.$on('selectedChemicalValues', function (event, chemValues) {
		  $scope.selectedChemicalValues = chemValues;
		})

		$scope.$on('selectedConcentrationValues', function (event, concentrationValues) {
		  $scope.selectedConcentrationValues = concentrationValues;
		})

	})

	.controller('chemicalsCtrl', function($scope) {
		  $scope.getSelectedChemicalValues = function(chemValues){
		  	$scope.$emit('selectedChemicalValues', chemValues);
		  }
	})

	.controller('concentrationCtrl', function($scope) {
		  $scope.getSelectedConcentrationValues = function(concentrationValues){
		  	$scope.$emit('selectedConcentrationValues', concentrationValues);
		  }
	})



    .filter('concentrationFilter', function () {
        return function (results, selectedConcentrationValues) {

            if (!selectedConcentrationValues) {
                return false;
            }

            filteredResults = []

            for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < selectedConcentrationValues.length; j++) {
                    if (results[i].concentrationId == selectedConcentrationValues[j]) {
                        filteredResults.push(results[i])
                    }
                }
            }

            return filteredResults;
        }
    })

    .filter('chemicalsFilter', function () {
        return function (results, selectedChemicalValues) {

            if (!selectedChemicalValues) {
                return false;
            }

            filteredResults = []

            for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < selectedChemicalValues.length; j++) {
                    if (results[i].chemId == selectedChemicalValues[j]) {
                        filteredResults.push(results[i])
                    }
                }
            }

            return filteredResults;
        }
    })
```

I hope this is enough to get going with it.  Enjoy!

-CaptainChainsaw
