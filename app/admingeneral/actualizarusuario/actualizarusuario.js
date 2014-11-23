angular.module("actualizarusuario", ["crud"])
.controller("ActualizarUsuarioController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.getUsuarios = function() {
		var url = "/api/v1/usuario/"
		service.read(url, function(status, data) {
			if (status) {
				console.log("Se cargaron correctamente los usuarios.");
				$scope.usuarios = data;
				console.log(data);
				return true;
			} else {
				console.log("Error cargando los usuarios, " +
				"intente de nuevo o contacte al administrador.");
				return false;
			}
		})
	}

	$scope.usuarios = [];
	$scope.getUsuarios();

	$scope.usuario = {};
	$scope.usuario.contacto = {};

	$scope.msg = {};

	$scope.inProgress = false;

	$scope.rpass = function() {
		$scope.usuario.rpassword = $scope.usuario.password;
		return true;
	}

	$scope.pass = function() {
		return $scope.usuario.password != $scope.usuario.rpassword;
	}

	$scope.actualizarusuario = function() {
		var url = "/api/v1/usuario/";
		$scope.msg.css = "";
		$scope.msg.msg = "Espere un momento porfavor...";
		$scope.inProgress = true;
		$scope.usuario.password = CryptoJS.SHA512($scope.usuario.password) + "";
		$scope.usuario.rpassword = $scope.usuario.password;
		service.update(url, $scope.usuario.id, $scope.usuario, function(status, data) {
			if (status) {
				$scope.msg.css = "";
				$scope.msg.msg = "Actualizacion exitosa.";
				$scope.inProgress = false;
				return true;
			} else {
				$scope.msg.css = "";
				$scope.msg.msg = "Ocurrio un error, intente de nuevo."
				$scope.inProgress = false;
				return false;
			}
		});
	}
}])
.directive("actualizarusuario", function() {
	return {
		templateUrl: "actualizarusuario/actualizarusuario.html"
	};
});