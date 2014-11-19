angular.module("crearequipo", ["crud"])
.controller("CrearEquipoController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearequipo", function() {
	return {
		templateUrl: "crearequipo/crearequipo.html"
	};
});