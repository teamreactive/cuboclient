angular.module("cambiarclave", ["crud"])
.controller("CambiarClaveController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.ans = {};
	$scope.cambio = {};

	$scope.clientes = {};

	var urlcliente = "/api/v1/cliente/";
	service.read(urlcliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.clientes = data;
			console.log(urlcliente + " " + data.length);
		} else {
			console.log("Error al cargar clientes");
		}
	});

	$scope.cambiar = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento porfavor...";

		var url = "/api/v1/usuario/";
		var keys = ["cliente", "nombre"];
		var vals = [$scope.cambio.cliente, $scope.cambio.usuario];
		service.readParam(url, keys, vals, function(status, data) {
			if (status) {
				var hash = CryptoJS.SHA512(CryptoJS.SHA512($scope.cambio.claveactual) + "") + "";
				if (hash == data[0].password) {
					var data2 = {
						"password": CryptoJS.SHA512(CryptoJS.SHA512($scope.cambio.nuevaclave) + "") + ""
					}
					service.update(url, data[0].id, data2, function(status, data) {
						if (status) {
							$scope.ans.css = "alert alert-success";
							$scope.ans.msg = "El cambio de contrasena fue exitoso"; 
						} else {
							$scope.ans.css = "alert alert-danger";
							$scope.ans.msg = "Ocurrio un error, intente de nuevo";
						}
					})
				} else {
					console.log(data[0]);
					$scope.ans.css = "alert alert-danger";
					$scope.ans.msg = "La contrasena actual fue incorrecta";
					return false;
				}
			} else {
				$scope.ans.css = "alert alert-danger";
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
