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

	$scope.tipos = [
		{
			"num": "1",
			"opt": "Administrador general"
		},
		{
			"num": "2",
			"opt": "Administrador Cliente"
		},
		{
			"num": "3",
			"opt": "Solicitante"
		},
		{
			"num": "4",
			"opt": "Codificador"
		},
		{
			"num": "5",
			"opt": "Aprobador de Solicitudes"
		},
		{
			"num": "6",
			"opt": "Comprador"
		},
		{
			"num": "7",
			"opt": "Aprobador de Compra"
		},
		{
			"num": "8",
			"opt": "Almacenista"
		}
	]

	$scope.usuario = {};
	$scope.usuario.contacto = {};
	$scope.usuario.tipo = {};

	$scope.msg = {};

	$scope.inProgress = false;

	$scope.crearusuario = function() {
		var url = "/api/v1/usuario/";
		$scope.msg.css = "";
		$scope.msg.msg = "Espere un momento porfavor...";
		$scope.inProgress = true;
		$scope.usuario.cliente = $scope.usuario.cliente.resource_uri
		$scope.usuario.password = CryptoJS.SHA512($scope.usuario.password) + "";
		$scope.usuario.rpassword = $scope.usuario.password;
		$scope.usuario.tipo = $scope.usuario.tipo.num;
		service.create(url, $scope.usuario, function(status, data) {
			if (status) {
				$scope.msg.css = "";
				$scope.msg.msg = "Usuario creado con exito.";
				$scope.usuario = {};
				$scope.usuario.contacto = {};
				$scope.usuario.tipo = {};
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