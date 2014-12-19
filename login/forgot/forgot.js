angular.module("forgot", ["crud"])
.controller("ForgotController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.olvido = false;
	$scope.olvidado = {};
	$scope.ans = {};
	var url = "/api/v1/usuario/";
	$scope.recuperar = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento porfavor...";
		service.readParam(url, "nombre", $scope.olvidado.usuario, function(status, data) {
			if (status) {
				if (data[0].email == $scope.olvidado.email.toUpperCase()) {
					var murl = "/mail/"
					var mdata = {
						"user": $scope.olvidado.usuario,
						"mail": data[0].email
					}
					service.create(murl, mdata, function(status, data) {
						if (status) {
							$scope.ans.css = "alert alert-success";
							$scope.ans.msg = "Se ha enviado un correo con instrucciones"
						} else {
							$scope.ans.css = "alert alert-danger";
							$scope.ans.msg = "No se pudo enviar el correo"
						}
					})
				} else {
					console.log(data[0].email);
					$scope.ans.css = "alert alert-warning";
					$scope.ans.msg = "El correo de registro no coincide";
					return false;
				}
			} else {
				$scope.ans.css = "alert alert-warning";
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
