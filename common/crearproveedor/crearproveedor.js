angular.module("crearproveedor", ["crud", "ngCookies"])
.controller("CrearProveedorController", ["$cookies", "$scope", "$http", "service", function($cookies, $scope, $http, service) {
	$scope.proveedor = {};
	$scope.proveedor.lugar = {};

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

	$scope.crearproveedor = function() {
		if (!$cookies.cliente) {
			$scope.ans.css = "alert alert-warning";
			$scope.ans.msg = "No se encontro cliente";
			return false;
		}
		$scope.proveedor.lugar.cliente = $cookies.cliente;
		console.log($scope.proveedor);
		var url = "/api/v1/proveedor/";
		service.create(url, $scope.proveedor, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Proveedor creado con exito";
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		});
	}
}])
.directive("crearproveedor", function() {
	return {
		templateUrl: "../common/crearproveedor/crearproveedor.html"
	};
});