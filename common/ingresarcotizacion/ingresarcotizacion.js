angular.module("ingresarcotizacion", ["crud"])
.controller("IngresarCotizacionController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("ingresarcotizacion", function() {
	return {
		templateUrl: "ingresarcotizacion/ingresarcotizacion.html"
	};
});