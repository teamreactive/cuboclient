angular.module("crearcontacto", ["crud"])
.controller("CrearContactoController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearcontacto", function() {
	return {
		templateUrl: "crearcontacto/crearcontacto.html"
	};
});