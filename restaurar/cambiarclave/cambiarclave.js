angular.module("cambiarclave", ["crud"])
.controller("CambiarClaveController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.ans = {}
	$scope.cambio = {}

	var url = "/api/v1/usuario/";

	$scope.cambiar = function() {
		$scope.ans.css = ""
		$scope.ans.msg = "Espere un momento porfavor..."

		service.readParam(url, "nombre", $scope.cambio.usuario, function(status, data) {
			if (status) {
				var hash = CryptoJS.SHA512(CryptoJS.SHA512($scope.cambio.claveactual) + "") + "";
				if (hash == data[0].password) {
					var data2 = {
						"password": CryptoJS.SHA512(CryptoJS.SHA512($scope.cambio.nuevaclave) + "") + ""
					}
					service.update(url, data[0].id, data2, function(status, data) {
						if (status) {
							$scope.ans.css = "";
							$scope.ans.msg = "El cambio de contrasena fue exitoso"; 
						} else {
							$scope.ans.css = "";
							$scope.ans.msg = "Ocurrio un error, intente de nuevo";
						}
					})
				} else {
					console.log(data[0]);
					$scope.ans.css = "";
					$scope.ans.msg = "La contrasena actual fue incorrecta";
					return false;
				}
			} else {
				$scope.ans.css = "";
				$scope.ans.msg = "El usuario no fue encontrado";
				return false;
			}
		});
	}

	$scope.invalidnew = function() {
		return $scope.cambio.nuevaclave != $scope.cambio.rnuevaclave;
	}
}])
.directive("cambiarclave", function() {
	return {
		templateUrl: "cambiarclave/cambiarclave.html"
	};
});
