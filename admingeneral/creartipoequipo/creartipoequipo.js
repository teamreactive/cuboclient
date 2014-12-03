angular.module("creartipoequipo", ["crud"])
.controller("CrearTipoEquipoController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("creartipoequipo", function() {
	return {
		templateUrl: "creartipoequipo/creartipoequipo.html"
	};
});