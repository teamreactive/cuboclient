angular.module("creartipoequipo", ["crud", "ngCookies"])
.controller("CrearTipoEquipoController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.tipo = {};

	$scope.ans = {};

	$scope.nombremsg = {};

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.validnombre = true;
	$scope.checknombre = function() {
		$scope.validnombre = false;
		$scope.nombremsg.css = "alert alert-info";
		$scope.nombremsg.msg = "Espere un momento...";

		if (!$scope.tipo.nombre) {
			$scope.validnombre = true;
			return true;
		} else {
			var urlcentro = "/api/v1/tipoequipo/";
			var keys = ["cliente", "nombre"];
			var vals = [cliente, $scope.tipo.nombre];
			service.readParam(urlcentro, keys, vals, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.nombremsg.css = "alert alert-warning";
						$scope.nombremsg.msg = "El nombre ya existe";
						$scope.validnombre = false;
						return false;
					} else {
						$scope.validnombre = true;
						return true;
					}
				} else {
					$scope.nombremsg.css = "alert alert-danger";
					$scope.nombremsg.msg = "No se pudo verificar el nombre";
					$scope.validnombre = false;
					return false;
				}
			})
		}
	}

	$scope.creartipoequipo = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		$scope.tipo.cliente = $cookies.cliente;

		var urltipo = "/api/v1/tipoequipo/";
		service.create(urltipo, $scope.tipo, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Tipo de equipo creado con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error al crear el tipo de equipo";
				return false;
			}
		})
	}
}])
.directive("creartipoequipo", function() {
	return {
		templateUrl: "../common/creartipoequipo/creartipoequipo.html"
	};
});