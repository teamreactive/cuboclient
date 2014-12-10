angular.module("crearproducto", ["crud", "ngCookies"])
.controller("CrearProductoController", ["$cookies", "$scope", "$http", "service", function($cookies, $scope, $http, service) {
	$scope.crear = {};

	$scope.ans = {};

	$scope.tipo = [
		{ "k": "BIEN", "v": "Bien" },
		{ "k": "SERVICIO",  "v": "Servicio" }
	];

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
	];

	$scope.familias = [];
	var url = "/api/v1/familia/";
	service.read(url, function(status, data) {
		if (status || data.length == 0) {
			$scope.familias = data;
			console.log(url + " " + data.length);
			return true;
		} else {
			console.log("Error cargando " + url);
			return false;
		}
	});

	$scope.equipos = [];
	var url = "/api/v1/equipo/";
	service.read(url, function(status, data) {
		if (status || data.length == 0) {
			$scope.equipos = data;
			console.log(url + " " + data.length);
			return true;
		} else {
			console.log("Error cargando " + url);
			return false;
		}
	});

	$scope.centros = [];
	var url = "/api/v1/centro/";
	service.read(url, function(status, data) {
		if (status || data.length == 0) {
			$scope.centros = data;
			console.log(url + " " + data.length);
			return true;
		} else {
			console.log("Error cargando " + url);
			return false;
		}
	});

	$scope.nombres = [{"k": 0, "v": ""}];
	$scope.unidades = [{"k": 0, "v": ""}];

	$scope.agregar = function(source) {
		var target = {
			"k": source.length,
			"v": ""
		};
		var i = source.indexOf(target);
		if (i == -1) {
			source.push(target);
		}
	};

	$scope.quitar = function(target, source) {
		if (source.length > 1) {
			var i = source.indexOf(target);
			if (i != -1) {
				source.splice(i, 1);
			}
		}
	};

	function arreglar(source, target, val) {
		var temp = [];
		for (var i = 0; i < source.length; i++) {
			var actual = source[i].v.toUpperCase();
			if (temp.indexOf(actual) == -1) {
				temp.push(actual);
			}
		}
		for (var i = 0; i < temp.length; i++) {
			if (val == "nombre") {
				target.push({ "nombre": temp[i] });
			} else if (val == "unidad") {
				target.push({ "unidad": temp[i] });
			}
		}
		return true;
	};

	$scope.crearproducto = function() {
		if (!$cookies.cliente) {
			$scope.ans.css = "alert alert-warning";
			$scope.ans.msg = "No hay sesion iniciada";
			return false;
		}
		$scope.crear.cliente = $cookies.cliente;
		$scope.crear.nombres = [];
		$scope.crear.unidades = [];
		arreglar($scope.nombres, $scope.crear.nombres, "nombre");
		arreglar($scope.unidades, $scope.crear.unidades, "unidad");
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		var url = "/api/v1/producto/";
		console.log($scope.crear);
		service.create(url, $scope.crear, function(status, data) {
			if (status) {
				console.log("Producto creado");
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Producto creado con exito";
				location.reload();
				return true;
			} else {
				$scope.ans.css = "alert alert-warning";
				$scope.ans.msg = "Error al crear producto";
				return false;
			}
		});
	}
}])
.directive("crearproducto", function() {
	return {
		templateUrl: "../common/crearproducto/crearproducto.html"
	};
});