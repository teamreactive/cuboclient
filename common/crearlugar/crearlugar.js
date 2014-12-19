angular.module("crearlugar", ["crud", "ngCookies"])
.controller("CrearLugarController", ["$scope", "$http", "service", "$cookies" , function($scope, $http, service, $cookies) {
	$scope.lugar = {};

	$scope.ans = {};

	$scope.secciones = [
		{
			"k":"AVENIDA",
			"v":"Avenida"
		},
		{
			"k":"CALLE",
			"v":"Calle"
		},
		{
			"k":"CARRERA",
			"v":"Carrera"
		},
		{
			"k":"DIAGONAL",
			"v":"Diagonal"
		},
		{
			"k":"TRANSVERSAL",
			"v":"Transversal"
		}
	];

	$scope.valid = true;
	$scope.checknombre = function() {
		if (!$scope.lugar.nombre) {
			$scope.valid = true;
			return true;
		} else {
			var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
			var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);
			var keys = ["cliente", "nombre"];
			var vals = [cliente, $scope.lugar.nombre];
			var urllugar = "/api/v1/lugar/";
			service.readParam(urllugar, keys, vals, function(status, data) {
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

	$scope.crearlugar = function() {
		$scope.lugar.cliente = $cookies.cliente;
		console.log($scope.lugar);
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento porfavor...";
		var url = "/api/v1/lugar/";
		service.create(url, $scope.lugar, function(status,data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Lugar creado exitosamente";
				location.reload();
				return true;
			} else 
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
		});
	};
}])
.directive("crearlugar", function() {
	return {
		templateUrl: "../common/crearlugar/crearlugar.html"
	};
});