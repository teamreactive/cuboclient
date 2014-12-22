angular.module("ingresarproducto", ["crud"])
.controller("IngresarProductoController", ["$scope", "$http", "service", function($scope, $http, service) {
	
}])
.directive("ingresarproducto", function() {
	return {
		templateUrl: "../common/ingresarproducto/ingresarproducto.html"
	};
});