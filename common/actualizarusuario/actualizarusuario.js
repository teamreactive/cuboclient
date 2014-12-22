angular.module("actualizarusuario", ["crud"])
.controller("ActualizarUsuarioController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.clientes = [];
	var urlcliente = "/api/v1/cliente/";
	service.read(urlcliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.clientes = data;
			console.log(urlcliente + " " + data.length);
		} else {
			console.log("Error cargando " + urlcliente);
		}
	});

	$scope.cliente = "";
	
	$scope.usuario = {};

	$scope.msg = {};

	$scope.inProgress = false;

	$scope.loading = false;

	$scope.usuarios = [];
	$scope.loadUsers = function() {
		$scope.loading = true;

		var temp = $scope.cliente.substring(0, $scope.cliente.length - 1);
		var cliente = temp.substring(temp.lastIndexOf("/") + 1, temp.length);

		var urlusuario = "/api/v1/usuario/";
		service.readParam(urlusuario, "cliente", cliente, function(status, data) {
			if (status) {
				$scope.usuarios = data;
				console.log(urlusuario + " " + data.length);
				$scope.loading = false;
				return true;
			} else {
				console.log("Error cargando " + urlusuario);
				$scope.loading = false;
				return false;
			}
		})
	}

	$scope.rpass = function() {
		$scope.usuario.rpassword = $scope.usuario.password;
		return true;
	}

	$scope.copy = {};
	$scope.setCopy = function() {
		$scope.copy = jQuery.extend(true, {}, $scope.usuario);
		$scope.rpass();
		return true;
	}

	$scope.descartar = function() {
		var index = $scope.usuarios.indexOf($scope.usuario);
		if (index != -1) {
			$scope.usuarios.splice(index, 1);
		}
		$scope.usuario = $scope.copy;
		$scope.usuarios.push($scope.usuario);
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
		$scope.rpass();
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
		templateUrl: "../common/actualizarusuario/actualizarusuario.html"
	};
});