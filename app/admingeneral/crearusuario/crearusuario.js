angular.module("crearusuario", ["crud"])
.controller("CrearUsuarioController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.getClientes = function() {
		var url = "/api/v1/cliente/";
		service.read(url, function(status, data) {
			if (status) {
				console.log("Se cargaron correctamente los clientes.");
				$scope.clientes = data;
				return true;
			} else {
				console.log("Error cargando los clientes, " +
				"intente de nuevo o contacte al administrador.");
				return false;
			}
		})
	}

	$scope.clientes = [];
	$scope.getClientes();

	$scope.usuario = {};
	$scope.usuario.contacto = {};

	$scope.msg = {};

	$scope.inProgress = false;

	$scope.pass = function() {
		return $scope.usuario.password != $scope.usuario.rpassword;
	}

	$scope.crearusuario = function() {
		var url = "/api/v1/usuario/";
		$scope.msg.css = "";
		$scope.msg.msg = "Espere un momento porfavor...";
		$scope.inProgress = true;
		$scope.usuario.cliente = "/api/v1/cliente/2/";
		alert($scope.usuario.cliente);
		service.create(url, $scope.usuario, function(status, data) {
			if (status) {
				$scope.msg.css = "";
				$scope.msg.msg = "Usuario creado con exito.";
				$scope.usuario = {};
				$scope.usuario.contacto = {};
				$scope.inProgress = false;
				return true;
			} else {
				$scope.msg.css = "";
				$scope.msg.msg = "Ocurrio un error, revise todos los campos."
				$scope.inProgress = false;
				console.log(data);
				return false;
			}
		});
	}
}])
.directive("crearusuario", function() {
	return {
		templateUrl: "crearusuario/crearusuario.html"
	};
});