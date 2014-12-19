angular.module("ingresarcotizacion", ["crud", "ngCookies"])
.controller("IngresarCotizacionController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.cotizacion = {};

	$scope.ans = {};

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.productos = [];
	var urlproducto = "/api/v1/producto/";
	service.readParam(urlproducto, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.productos = data;
			console.log(urlproducto + " " + data.length);
		} else {
			console.log("Error cargando " + urlproducto);
		}
	});

	$scope.iva = [16, 1.6, 20, 0];

	$scope.formapago = ["Anticipado 100%", "Contado", "En dias"];

	$scope.proveedores = [];
	var urlproveedor = "/api/v1/proveedor/";
	service.readParam(urlproveedor, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.proveedores = data;
			console.log(urlproveedor + " " + data.length);
		} else {
			console.log("Error cargando " + urlproveedor);
		}
	});

	$scope.ingresarcotizacion = function() {
		console.log($scope.cotizacion);
		$scope.cotizacion.cliente = cliente;

		var url = "/api/v1/cotizacion/";
		service.create(url, $scope.cotizacion, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Cotizacion creada";
				return true;
			} else {
				$scope.ans.css = "alert alert-info";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		});
	};
}])
.directive("ingresarcotizacion", function() {
	return {
		templateUrl: "../common/ingresarcotizacion/ingresarcotizacion.html"
	};
});