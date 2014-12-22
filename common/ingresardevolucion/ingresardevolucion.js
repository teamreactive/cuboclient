angular.module("ingresardevolucion", ["crud"])
.controller("IngresarDevolucionController", ["$scope", "$http", "service", function($scope, $http, service) {
	
}])
.directive("ingresardevolucion", function() {
	return {
		templateUrl: "../common/ingresardevolucion/ingresardevolucion.html"
	};
});