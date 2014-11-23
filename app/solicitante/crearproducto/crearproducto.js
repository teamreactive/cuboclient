angular.module("crearproducto", ["crud"])
.controller("CrearProductoController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.producto = {};

	$scope.quitarnombre = function(nombre) {
		var i = $scope.producto.nombres.indexOf(nombre);
		$scope.producto.nombres.splice(i, 1);
	}

	$scope.agregarnombre = function() {
		$scope.producto.nombres.push("");
	}

	$scope.quitarunidad = function(unidad) {
		var i = $scope.producto.unidades.indexOf(unidad);
		$scope.producto.unidades.splice(i, 1);
	}

	$scope.agregarunidad = function() {
		$scope.producto.unidades.push("");
	}

	$scope.crearproducto = function() {
		// TODO
	}
}])
.directive("crearproducto", function() {
	return {
		templateUrl: "crearproducto/crearproducto.html"
	};
});