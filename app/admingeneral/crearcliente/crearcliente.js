angular.module("crearcliente", ["crud"])
.controller("CrearClienteController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearcliente", function() {
	return {
		templateUrl: "crearcliente/crearcliente.html"
	};
});