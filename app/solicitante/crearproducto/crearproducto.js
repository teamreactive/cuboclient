angular.module("crearproducto", ["crud"])
.controller("CrearProductoController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.producto = {};
	$scope.producto.nombres = [];

	$scope.quitarunidad = function(unidad) {
		var i = $scope.producto.unidades.indexOf(unidad);
		$scope.producto.unidades.splice(i, 1);
	}

	$scope.agregarunidad = function() {
		if ($scope.producto.unidades == null)
			$scope.producto.unidades = [];
		var max = $scope.producto.unidades.length;
		$scope.producto.unidades.push(max);
	}

	$scope.crearproducto = function() {
		// TODO
		var nombres = $scope.nombres;
		var names = [];
		var nombre = "";
		for (var i = 0; i < nombres.length; i++) {
			if (nombres[i] != ",") {
				nombre += nombres[i];
			} else {
				names.push(nombre);
				nombre = "";
			}
		}
		if (nombre.length > 0) {
			names.push(nombre);
			nombre = "";
		}
	}
}])
.directive("crearproducto", function() {
	return {
		templateUrl: "crearproducto/crearproducto.html"
	};
});