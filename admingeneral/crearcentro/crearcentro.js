angular.module("crearcentro", ["crud"])
.controller("CrearCentroController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearcentro", function() {
	return {
		templateUrl: "crearcentro/crearcentro.html"
	};
});