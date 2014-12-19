angular.module("enviarcotizacion", ["crud", "ngCookies"])
.controller("EnviarCotizacionController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.enviar = {};

	$scope.ans = {};

	$scope.ans1 = {};
	$scope.ans1.css = "alert alert-info";
	$scope.ans1.msg = "Cargando cotizaciones...";

	$scope.ans2 = {};
	$scope.ans2.css = "alert alert-info";
	$scope.ans2.msg = "Cargando proveedores...";

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.cotizaciones = [];
	var urlcotizacion = "/api/v1/solicitud/";
	var keys = ["cliente", "estado"];
	var vals = [cliente, "0200"];
	service.readParam(urlcotizacion, keys, vals, function(status, data) {
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
	service.readParam(urlproveedor, "cliente", cliente, function(status, data) {
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