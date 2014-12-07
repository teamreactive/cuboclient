angular.module("crearproducto", ["crud", "ngCookies"])
.controller("CrearProductoController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service,$cookies) {
	$scope.producto = {};
	$scope.i = $cookies.cliente;
	$scope.cliente = $cookies.cliente;
	$scope.submitenabled = true;

	$scope.servicios = [
		{
			"id": true,
			"nombre":"Servicio"
		},
		{
			"id":false,
			"nombre":"Bien"
		}
	];

	$scope.familias = [];
	service.read("/api/v1/familia/",function(status, data){
		if(status || data.length == 0){
			$scope.familias = data;
		} else{
			console.log("Hubo un error cargando las familias.");
		}
	});

	$scope.nombresinput = "";
	$scope.nombres = [];
	$scope.agregarnombre = function() {
		var length = $scope.nombresinput.length;
		if (length != 0) {
			var last = $scope.nombresinput[length-1];
			if(last == ",") {
				var index = $scope.nombres.indexOf($scope.nombresinput);
				if (index == -1) {
					var n = $scope.nombresinput.length;
					var nuevo = $scope.nombresinput.substring(0, n-1);
					$scope.nombres.push(nuevo);
				}
				$scope.nombresinput = "";
			}
		}
	};

	$scope.quitarnombre = function(nombre) {
		var index = $scope.nombres.indexOf(nombre);
		if (index != -1) {
			$scope.nombres.splice(index, 1);
		}
	};

	$scope.producto.units = [];
	$scope.agregarunidad = function() {
		var nuevo = {
			"k": $scope.producto.units.length,
			"unidad": "",
			"talla": ""
		};
		var index = $scope.producto.units.indexOf(nuevo);
		if (index == -1) {
			$scope.producto.units.push(nuevo);
		}
	};

	$scope.quitarunidad = function(unidad) {
		var index = $scope.producto.units.indexOf(unidad);
		if (index != -1) {
			$scope.producto.units.splice(index, 1);
		}
	};

	$scope.crearproducto = function() {
		if ($scope.producto.familia) {
			$scope.producto.familia = $scope.producto.familia.resource_uri;
		}
		$scope.submitenabled = false;
		$scope.producto.cliente = $scope.cliente;
		service.create("/api/v1/producto/", $scope.producto, function(status, data) {
			if(status) {
				console.log("Producto creado exitosamente");
				console.log(data);
				$scope.crearnombres(data.resource_uri);
			}
			else{
				console.log("Ocurrio un error");
				console.log(data);
			}
		});
	};

	$scope.crearunits = function(uri) {
		var url = "/api/v1/unidadproducto/";
		if($scope.producto.units.length != 0){
			var unidad = $scope.producto.units[$scope.producto.units.length-1];
			unidad["producto"] = uri;
			service.create(url, unidad, function(status,data){
				if(status) {
					console.log("unidad agregada correctamente.");
					$scope.producto.units.pop();
					$scope.crearunits(uri);
				} else {
					console.log("Ocurrio un error.");
					console.log(data);
				}
			})
		}
	};

	$scope.crearnombres = function(uri) {
		alert("entered");
		var url = "/api/v1/nombreproducto/";
		if($scope.nombres.length != 0){
			var nombre = {"nombre":$scope.nombres[$scope.nombres.length-1],"producto":uri};
			service.create(url, nombre, function(status, data) {
				if (status) {
					console.log("Nombres agregados correctamente");
					$scope.nombres.pop();
					$scope.crearnombres(uri);
				} else {
					console.log("Ocurrio un error");
					console.log(data);
				}
			});
		} else {
			$scope.crearunits(uri);
		}
	}
}])
.directive("crearproducto", function() {
	return {
		templateUrl: "../common/crearproducto/crearproducto.html"
	};
});

var filternombre = function(nombre){
	var ans = "";
	var i = 0;
	var l = nombre.length;
	while(i < l && nombre[i] == " ") i++;
	if (i == l) return "";
	while(i < l-1) {
		if ((i != 0 && nombre[i] == " " && nombre[i-1] != " ") || nombre[i] != " ") {
			ans += nombre[i];
		}
		i++;
	}
	return ans;
};