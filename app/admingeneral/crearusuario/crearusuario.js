angular.module("crearusuario", ["crud"])
.controller("CrearUsuarioController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("crearusuario", function() {
	return {
		templateUrl: "crearusuario/crearusuario.html"
	};
});