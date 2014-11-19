angular.module("actualizarproducto", ["crud"])
.controller("ActualizarProductoController", ["$scope", "$http", "service", function($scope, $http, service) {

}])
.directive("actualizarproducto", function() {
	return {
		templateUrl: "actualizarproducto/actualizarproducto.html"
	};
});