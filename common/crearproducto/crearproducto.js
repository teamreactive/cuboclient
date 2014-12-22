angular.module("crearproducto", ["crud", "ngCookies"])
.controller("CrearProductoController", ["$cookies", "$scope", "$http", "service", function($cookies, $scope, $http, service) {
	$scope.producto = {};

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

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.familias = [];
	var urlfamilia = "/api/v1/familia/";
	service.readParam(urlfamilia, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.familias = data;
			console.log(urlfamilia + " " + data.length);
		} else {
			console.log("Error cargando " + urlfamilia);
		}
	});

	$scope.equipos = [];
	var urlequipo = "/api/v1/equipo/";
	service.readParam(urlequipo, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.equipos = data;
			console.log(urlequipo + " " + data.length);
		} else {
			console.log("Error cargando " + urlequipo);
		}
	});

	$scope.centros = [];
	var urlcentro = "/api/v1/centro/";
	service.readParam(urlcentro, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.centros = data;
			console.log(urlcentro + " " + data.length);
		} else {
			console.log("Error cargando " + urlcentro);
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

	$scope.valid = true;
	$scope.validnombre = {};
	$scope.checknombre = function(nombre, index) {
		if (!nombre) {
			$scope.validnombre[index] = true;
			checkall();
			return true;
		} else {
			var keys = ["cliente", "nombre"];
			var vals = [cliente, nombre];
			var urlnombres = "/api/v1/nombreproducto/";
			service.readParam(urlnombres, keys, vals, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.validnombre[index] = false;
						checkall();
						return false;
					} else {
						$scope.validnombre[index] = true;
						checkall();
						return true;
					}
				} else {
					console.log("No se pudo verificar el nombre");
					$scope.validnombre[index] = false;
					checkall();
					return false;
				} 
			})
		}	
	}

	function checkall() {
		for (var nombre in $scope.validnombre) {
			if ($scope.validnombre.hasOwnProperty(nombre)) {
				if ($scope.validnombre[nombre] == false) {
					$scope.valid = false;
					return false;
				}
			}
		}
		$scope.valid = true;
		return true;
	}


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
		$scope.producto.cliente = $cookies.cliente;
		$scope.producto.nombres = [];
		$scope.producto.unidades = [];
		arreglar($scope.nombres, $scope.producto.nombres, "nombre");
		arreglar($scope.unidades, $scope.producto.unidades, "unidad");
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		var url = "/api/v1/producto/";
		console.log($scope.producto);
		service.create(url, $scope.producto, function(status, data) {
			if (status) {
				console.log("Producto creado");
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Producto creado con exito";
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