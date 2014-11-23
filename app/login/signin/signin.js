angular.module("signin", ["crud"])
.controller("SigninController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.usuario = {};
	$scope.ans = {};
	var url = "/api/v1/usuario/";
	$scope.login = function() {
		$scope.ans.css = "";
		$scope.ans.msg = "Espere un momento porfavor...";
		service.readParam(url, "nombre", $scope.usuario.usuario, function(status, data) {
			if (status) {
				if ($scope.usuario.contrasena == data[0].password) {
					$scope.ans.css = "";
					$scope.ans.msg = "El inicio de sesion fue exitoso";
					document.cookie = "nombre=" +
									  data[0].nombre +
									  "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
					document.cookie = "cliente=" +
									  data[0].cliente +
									  "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
					return true;
				} else {
					console.log(data[0])
					$scope.ans.css = "";
					$scope.ans.msg = "La contrasena fue incorrecta";
					return false;
				}
			} else {
				$scope.ans.css = "";
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