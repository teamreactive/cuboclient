angular.module("actualizarproducto", ["crud", "ngCookies"])
.controller("ActualizarProductoController", ["$cookies", "$scope", "$http", "service", function($cookies, $scope, $http, service) {
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

	$scope.productos = {};
	var urlproducto = "/api/v1/producto";
	service.readParam(urlproducto, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.productos = data;
			console.log(urlproducto + " " + data.length);
		} else {
			console.log("Error cargando " + urlproducto);
		}
	});

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

	$scope.copy = {};
	$scope.setCopy = function() {
		$scope.copy = jQuery.extend(true, {}, $scope.producto);

		$scope.nombres = [];
		for (var i = 0; i < $scope.producto.nombres.length; i++) {
			var actual = $scope.producto.nombres[i];
			var nuevo = {"k": i+1, "v": actual.nombre};
			$scope.nombres.push(nuevo);
		}

		if ($scope.nombres.length == 0) {
			$scope.nombres = [{"k": 0, "v": ""}];
		}

		$scope.unidades = [];
		for (var i = 0; i < $scope.producto.unidades.length; i++) {
			var actual = $scope.producto.unidades[i];
			var nuevo = {"k": i+1, "v": actual.unidad};
			$scope.unidades.push(nuevo);
		}

		if ($scope.unidades.length == 0) {
			$scope.unidades = [{"k": 0, "v": ""}];
		}

		console.log($scope.nombres);

		return true;
	}

	$scope.descartar = function() {
		console.log("HERE");
		var index = $scope.productos.indexOf($scope.producto);
		console.log(index);
		if (index != -1) {
			$scope.productos.splice(index, 1);
		}
		$scope.producto = $scope.copy;
		$scope.productos.push($scope.producto);
		return true;
	}

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

	$scope.actualizarproducto = function() {
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
.directive("actualizarproducto", function() {
	return {
		templateUrl: "../common/actualizarproducto/actualizarproducto.html"
	};
});