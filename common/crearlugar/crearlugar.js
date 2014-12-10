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

	$scope.crearlugar = function() {
		if (!$cookies.cliente) {
			$scope.ans.css = "alert alert-warning";
			$scope.ans.msg = "No hay sesion iniciada";
			return false;
		}
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