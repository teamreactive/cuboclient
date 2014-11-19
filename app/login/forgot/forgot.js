angular.module("forgot", ["crud"])
.controller("ForgotController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.olvido = false;
	$scope.olvidado = {};
	$scope.ans = {};
	var url = "/api/v1/usuario/";
	$scope.recuperar = function() {
		$scope.ans.css = "";
		$scope.ans.msg = "Espere un momento porfavor...";
		service.readParam(url, "nombre", $scope.olvidado.usuario, function(status, data) {
			if (status) {
				if (data[0].contacto.email == $scope.olvidado.email) {
					$scope.ans.css = "";
					$scope.ans.msg = "Se ha enviado un correo con instrucciones";
				} else {
					$scope.ans.css = "";
					$scope.ans.msg = "El correo de registro no coincide";
					return false;
				}
			} else {
				$scope.ans.css = "";
				$scope.ans.msg = "El usuario no fue encontrado";
				return false;
			}
		})
	}
}])
.directive("forgot", function() {
	return {
		templateUrl: "forgot/forgot.html"
	};
});
