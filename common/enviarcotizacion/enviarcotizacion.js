angular.module("enviarcotizacion", ["crud"])
.controller("EnviarCotizacionController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.enviar = {};

	$scope.ans = {};

	$scope.ans1 = {};
	$scope.ans1.css = "alert alert-info";
	$scope.ans1.msg = "Cargando cotizaciones...";

	$scope.ans2 = {};
	$scope.ans2.css = "alert alert-info";
	$scope.ans2.msg = "Cargando proveedores...";

	$scope.cotizaciones = [];
	var urlcotizacion = "/api/v1/solicitud/";
	service.readParam(urlcotizacion, "estado", "0200", function(status, data) {
		if (status || data.length == 0) {
			$scope.cotizaciones = data;
			console.log(urlcotizacion + " " + data.length);
			if (data.length > 0) {
				$scope.ans1 = {};
			} else {
				$scope.ans1.css = "alert alert-info";
				$scope.ans1.msg = "No hay solicitudes para cotizar";
			}
		} else {
			$scope.ans1.css = "alert alert-warning";
			$scope.ans1.msg = "Ocurrio un error cargando cotizaciones";
			console.log("Error cargando " + urlcotizacion);
		}
	});

	$scope.proveedores = [];
	var urlproveedor = "/api/v1/proveedor/";
	service.read(urlproveedor, function(status, data) {
		if (status) {
			$scope.proveedores = data;
			console.log(urlproveedor + " " + data.length);
			if (data.length > 0) {
				$scope.ans2 = {};
			} else {
				$scope.ans2.css = "alert alert-info";
				$scope.ans2.msg = "No hay proveedores para enviar";
			}
		} else {
			$scope.ans2.css = "alert alert-warning";
			$scope.ans2.msg = "Ocurrio un error cargando proveedores";
			console.log("Error cargando " + urlproveedor);
		}
	});


}])
.directive("enviarcotizacion", function() {
	return {
		templateUrl: "../common/enviarcotizacion/enviarcotizacion.html"
	};
});