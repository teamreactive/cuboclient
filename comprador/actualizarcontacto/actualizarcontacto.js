angular.module("actualizarcontacto", ["crud"])
.controller("ActualizarContactoController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("actualizarcontacto", function() {
	return {
		templateUrl: "actualizarcontacto/actualizarcontacto.html"
	};
});