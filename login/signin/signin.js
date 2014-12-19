angular.module("signin", ["crud", "ngCookies"])
.controller("SigninController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {

	/**
	$scope.checkSession = function() {
		if ($cookies.nombre && $cookies.cliente && $cookies.tipo) {
			var params = ["nombre", "cliente", "tipo"];
			var vals = [$cookies.nombre, $cookies.cliente, $cookies.tipo];
			service.readParam(url, params, vals, function(status, data) {
				if (status) {
					window.location.replace("http://stackoverflow.com");
					return true;
				} else {
					console.log("FALSE");
					return false;
				}
			});
		} else {
			return false;
		}
	}
	$scope.checkSession();
	**/

	var url = "/api/v1/usuario/";

	$scope.usuario = {};

	$scope.ans = {};

	$scope.login = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento porfavor...";

		service.readParam(url, "nombre", $scope.usuario.usuario, function(status, data) {
			if (status) {
				var hash = CryptoJS.SHA512(CryptoJS.SHA512($scope.usuario.contrasena) + "") + "";
				if (hash == data[0].password) {
					$scope.ans.css = "alert alert-success";
					$scope.ans.msg = "El inicio de sesion fue exitoso";

					document.cookie = "nombre=" +
									  data[0].nombre +
									  "; expires=Fri, 31 Dec 9999 23:59:59 GMT" +
									  "; path=/";

					document.cookie = "cliente=" +
									  data[0].cliente +
									  "; expires=Fri, 31 Dec 9999 23:59:59 GMT" +
									  "; path=/";

					document.cookie = "tipo=" +
									  data[0].tipo +
									  "; expires=Fri, 31 Dec 9999 23:59:59 GMT" +
									  "; path=/";

				    document.cookie = "usuario=" +
									  data[0].resource_uri +
									  "; expires=Fri, 31 Dec 9999 23:59:59 GMT" +
									  "; path=/";
									  
					return true;
				} else {
					console.log(data[0]);
					$scope.ans.css = "alert alert-danger";
					$scope.ans.msg = "La contrasena fue incorrecta";
					return false;
				}
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "El usuario no fue encontrado";
				return false;
			}
		});
	}
}])
.directive("signin", function() {
	return {
		templateUrl: "signin/signin.html"
	};
});