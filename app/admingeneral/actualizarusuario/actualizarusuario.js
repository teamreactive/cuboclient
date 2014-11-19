angular.module("actualizarusuario", ["crud"])
.controller("ActualizarUsuarioController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("actualizarusuario", function() {
	return {
		templateUrl: "actualizarusuario/actualizarusuario.html"
	};
});