angular.module("actualizarcliente", ["crud", "ngCookies"])
.controller("ActualizarClienteController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.cliente = {};

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

	$scope.clientes = [];
	var urlcliente = "/api/v1/cliente/";
	service.read(urlcliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.clientes = data;
			console.log(urlcliente + " " + data.length);
		} else {
			console.log("Error cargando " + urlcliente);
		}
	})

	$scope.copy = {};
	$scope.setCopy = function() {
		$scope.copy = jQuery.extend(true, {}, $scope.cliente);
		return true;
	}

	$scope.descartar = function() {
		var index = $scope.clientes.indexOf($scope.cliente);
		if (index != -1) {
			$scope.clientes.splice(index, 1);
		}
		$scope.cliente = $scope.copy;
		$scope.clientes.push($scope.cliente);
		return true;
	}

	$scope.nitmsg = {};

	$scope.validnit = true;
	$scope.checknit = function() {
		if (!$scope.cliente.nit) {
			$scope.validnit = true;
			return true;
		} else if ($scope.cliente.nit == $scope.old.nit) {
			$scope.validnit = true;
			return true;
		} else {
			$scope.validnit = false;
			$scope.nitmsg.css = "alert alert-info";
			$scope.nitmsg.msg = "Espere un momento...";

			var urlcliente = "/api/v1/cliente";
			service.readParam(urlcliente, "nit", $scope.cliente.nit, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.nitmsg.css = "alert alert-warning";
						$scope.nitmsg.msg = "El NIT ingresado ya existe";
						$scope.validnit = false;
						return false;
					} else {
						$scope.nitmsg.css = "alert alert-success";
						$scope.nitmsg.msg = "El NIT ingresado es valido";
						$scope.validnit = true;
						return true;
					}
				} else {
					$scope.nitmsg.css = "alert alert-danger";
					$scope.nitmsg.msg = "No se pudo verificar la validez del NIT";
					$scope.validnit = false;
					return false;
				}
			});
		}
	}

	$scope.razonmsg = {};

	$scope.validrazon = true;
	$scope.checkrazon = function() {
		if (!$scope.cliente.razon) {
			$scope.validrazon = true;
			return true;
		} else if ($scope.cliente.razon == $scope.cliente.old) {
			$scope.validrazon = true;
			return true;
		} else {
			$scope.validrazon = false;
			$scope.razonmsg.css = "alert alert-info";
			$scope.razonmsg.msg = "Espere un momento...";

			var urlcliente = "/api/v1/cliente";
			service.readParam(urlcliente, "razon", $scope.cliente.razon, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.razonmsg.css = "alert alert-warning";
						$scope.razonmsg.msg = "La razon ingresada ya existe";
						$scope.validrazon = false;
						return false;
					} else {
						$scope.razonmsg.css = "alert alert-success";
						$scope.razonmsg.msg = "La razon ingresada es valida"
						$scope.validrazon = true;
						return true;
					}
				} else {
					$scope.razonmsg.css = "alert alert-danger";
					$scope.razonmsg.msg = "No se pudo verificar la validez de la razon";
					$scope.validrazon = false;
					return false;
				}
			});
		}
	}

	$scope.actualizarcliente = function() {
		console.log($scope.cliente);
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";

		var url = "/api/v1/cliente/";
		service.update(url, $scope.cliente.id, $scope.cliente, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Cliente actualizado con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error al actualizar el cliente";
				return false;
			}
		})
	}
}])
.directive("actualizarcliente", function() {
	return {
		templateUrl: "../common/actualizarcliente/actualizarcliente.html"
	};
});