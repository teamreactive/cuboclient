angular.module("crearusuario", ["crud", "ngCookies"])
.controller("CrearUsuarioController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {
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
		$scope.usuario.cliente = $cookies.cliente;
		console.log($scope.usuario.cliente)
		$scope.usuario.password = CryptoJS.SHA512($scope.usuario.password) + "";
		$scope.usuario.rpassword = $scope.usuario.password;
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