angular.module("actualizarproveedor", ["crud", "ngCookies"])
.controller("ActualizarProveedorController", ["$cookies", "$scope", "$http", "service", function($cookies, $scope, $http, service) {
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

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);
	var urlprov = "/api/v1/proveedor/";

	$scope.proveedores = [];
	service.readParam(urlprov, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.proveedores = data;
			console.log(urlprov + " " + data.length);
		} else {
			console.log("Error cargando " + urlprov);
		}
	})

	$scope.valid = true;
	$scope.checkrazon = function() {
		if (!$scope.proveedor.razon) {
			$scope.valid = true;
			return true;
		} else if ($scope.proveedor.razon == $scope.copy.razon) {
			$scope.valid = true;
			return true;
		} else {
			var keys = ["cliente", "razon"];
			var vals = [cliente, $scope.proveedor.razon];
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

	$scope.copy = {};
	$scope.setCopy = function() {
		$scope.copy = jQuery.extend(true, {}, $scope.proveedor);
		return true;
	}

	$scope.descartar = function() {
		var index = $scope.proveedores.indexOf($scope.proveedor);
		if (index != -1) {
			$scope.proveedores.splice(index, 1);
		}
		$scope.proveedor = $scope.copy;
		$scope.proveedores.push($scope.proveedor);
		return true;
	}

	$scope.actualizarproveedor = function() {
		console.log($scope.proveedor);

		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";

		var url = "/api/v1/proveedor/";
		service.update(url, $scope.proveedor.id, $scope.proveedor, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Proveedor actualizado con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		});
	}
}])
.directive("actualizarproveedor", function() {
	return {
		templateUrl: "../common/actualizarproveedor/actualizarproveedor.html"
	};
});