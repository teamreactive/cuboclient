angular.module("enviarcotizacion", ["crud"])
.controller("EnviarCotizacionController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("enviarcotizacion", function() {
	return {
		templateUrl: "enviarcotizacion/enviarcotizacion.html"
	};
});