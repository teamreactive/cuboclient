angular.module("crearequipo", ["crud", "ngCookies"])
.controller("CrearEquipoController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.equipo = {};

	$scope.tipoequipo = {};

	$scope.ans = {};

	$scope.nombremsg = {};

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.tipos = [];
	urltipo = "/api/v1/tipoequipo/";
	service.readParam(urltipo, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.tipos = data;
			console.log(urltipo + " " + data.length);
		} else {
			console.log("Error cargando " + urltipo);
		}
	});

	$scope.validnombre = true;
	$scope.checknombre = function() {
		$scope.validnombre = false;
		$scope.nombremsg.css = "alert alert-info";
		$scope.nombremsg.msg = "Espere un momento...";

		if (!$scope.equipo.nombre) {
			$scope.validnombre = true;
			return true;
		} else {
			var urlequipo = "/api/v1/equipo/";
			var keys = ["cliente", "nombre"];
			var vals = [cliente, $scope.equipo.nombre];
			service.readParam(urlequipo, keys, vals, function(status, data) {
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
					$scope.nombremsg.msg = "No se puede verificar el nombre";
					$scope.validnombre = false;
					return false;
				}
			});
		}
	}

	$scope.crearequipo = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		$scope.equipo.cliente = $cookies.cliente;
		$scope.equipo.tipoequipo = $scope.tipoequipo.resource_uri;

		var urlequipo = "/api/v1/equipo/";
		service.create(urlequipo, $scope.equipo, function(status, data) {
			if (status) {
				console.log("Equipo creado");
				$scope.tipoequipo.numero += 1;

				var urltipo = "/api/v1/tipoequipo/";
				service.update(urltipo, $scope.tipoequipo.id, $scope.tipoequipo, function(status) {
					if (status) {
						$scope.ans.css = "alert alert-success";
						$scope.ans.msg = "Equipo creado con exito";
						return true;
					} else {
						$scope.ans.css = "alert alert-danger";
						$scope.ans.msg = "Ocurrio un error al crear el equipo";
						return false;
					}
				});
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error al crear el equipo";
				return false;
			}
		});
	}
}])
.directive("crearequipo", function() {
	return {
		templateUrl: "../common/crearequipo/crearequipo.html"
	};
});