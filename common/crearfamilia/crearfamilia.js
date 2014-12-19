angular.module("crearfamilia", ["crud", "ngCookies"])
.controller("CrearFamiliaController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.familia = {};

	$scope.ans = {};

	$scope.valid = true;
	$scope.checknombre = function() {
		if (!$scope.familia.nombre) {
			$scope.valid = true;
			return true;
		} else {
			var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
			var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);
			var keys = ["cliente", "nombre"];
			var vals = [cliente, $scope.familia.nombre];
			var urlfamilia = "/api/v1/familia/";
			service.readParam(urlfamilia, keys, vals, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.valid = false;
						return false;
					} else {
						$scope.valid = true;
						return true;
					}
				} else {
					console.log("No se pudo verificar el nombre");
					$scope.valid = false;
					return false;
				} 
			});
		}
	}

	$scope.crearfamilia = function() {
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		$scope.familia.cliente = $cookies.cliente;
		console.log($scope.familia);

		var url = "/api/v1/familia/";
		service.create(url, $scope.familia, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Familia-proveedor creada con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		})
	}
}])
.directive("crearfamilia", function() {
	return {
		templateUrl: "../common/crearfamilia/crearfamilia.html"
	};
});