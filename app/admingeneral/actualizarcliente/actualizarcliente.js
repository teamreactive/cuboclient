angular.module("actualizarcliente", ["crud"])
.controller("ActualizarClienteController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("actualizarcliente", function() {
	return {
		templateUrl: "actualizarcliente/actualizarcliente.html"
	};
});