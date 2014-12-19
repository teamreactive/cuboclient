angular.module("crearproveedor", ["crud", "ngCookies"])
.controller("CrearProveedorController", ["$cookies", "$scope", "$http", "service", function($cookies, $scope, $http, service) {
	$scope.proveedor = {};
	$scope.proveedor.lugar = {};

	$scope.ans = {};

	$scope.secciones = [
		{
			"k":"AVENIDA",
			"v":"Avenida"
		},
		{
			"k":"CALLE",
			"v":"Calle"
		},
		{
			"k":"CARRERA",
			"v":"Carrera"
		},
		{
			"k":"DIAGONAL",
			"v":"Diagonal"
		},
		{
			"k":"TRANSVERSAL",
			"v":"Transversal"
		}
	];

	$scope.valid = true;
	$scope.checkrazon = function() {
		if (!$scope.proveedor.razon) {
			$scope.valid = true;
			return true;
		} else {
			var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
			var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);
			var keys = ["cliente", "razon"];
			var vals = [cliente, $scope.proveedor.razon];
			var urlprov = "/api/v1/proveedor/"
			service.readParam(urlprov, keys, vals, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.valid = false;
						return false;
					} else {
						$scope.valid = true;
						return true;
					}
				} else {
					console.log("No se pudo verificar el nombre");
					$scope.valid = false;
					return false;
				} 
			});
		}	
	}

	$scope.crearproveedor = function() {
		$scope.proveedor.cliente = $cookies.cliente;
		$scope.proveedor.lugar.cliente = $cookies.cliente;
		console.log($scope.proveedor);
		var url = "/api/v1/proveedor/";
		service.create(url, $scope.proveedor, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Proveedor creado con exito";
				location.reload();
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		});
	}
}])
.directive("crearproveedor", function() {
	return {
		templateUrl: "../common/crearproveedor/crearproveedor.html"
	};
});