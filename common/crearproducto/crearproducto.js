angular.module("crearproducto", ["crud"])
.controller("CrearProductoController", ["$scope", "$http", "service", function($scope, $http, service) {

	$scope.crear = {};
	$scope.crear.nombres = [{"k": 0, "v": ""}];
	$scope.crear.unidades = [];

	$scope.tipo = [
		{
			"k": false,
			"v": "Bien"
		},
		{
			"k": true,
			"v": "Servicio"
		}
	]

	$scope.ec = 1;
	$scope.equipocentro = [
		{
			"k": 1,
			"v": "Equipo"
		},
		{
			"k": 2,
			"v": "Centro de costo"
		}
	]

	$scope.fmsg = "Cargando familias...";
	$scope.familias = [];
	service.read("/api/v1/familia", function(status, data) {
		if (status) {
			$scope.familias = data;
			$scope.fmsg = "No hay ninguna familia-proveedor"
			console.log("Familias cargadas satisfactoriamente");
		} else {
			console.log("Error cargando familias");
		}
	});

	$scope.agregarnombre = function() {
		var name = {
			"k": $scope.crear.nombres.length,
			"v": ""
		};
		$scope.crear.nombres.push(name);
	}

	$scope.quitarnombre = function(nombre) {
		if ($scope.crear.nombres.length > 1) { 
			var i = $scope.crear.nombres.indexOf(nombre);
			if (i != -1) {
				$scope.crear.nombres.splice(i, 1);
			}
		}
	}

	$scope.agregarunidad = function() {
		var unidad = {
			"k": $scope.crear.unidades.length,
			"v": ""
		};
		$scope.crear.unidades.push(unidad);
	}

	$scope.quitarunidad = function(unidad) {
		var i = $scope.crear.unidades.indexOf(unidad);
		if (i != -1) {
			$scope.crear.unidades.splice(i, 1);
		}
	}
}])
.directive("crearproducto", function() {
	return {
		templateUrl: "crearproducto/crearproducto.html"
	};
});