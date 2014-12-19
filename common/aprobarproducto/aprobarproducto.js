angular.module("aprobarproducto", ["crud", "ngCookies"])
.controller("AprobarProductoController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando productos pendientes...";

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.productos = [];
	var urlproductos = "/api/v1/producto/";
	var keys = ["cliente", "activo"];
	var vals = [cliente, false];
	service.readParam(urlproductos, keys, vals, function(status, data) {
		if (status || data.length == 0) {
			$scope.productos = data;
			console.log(urlproductos + " " + data.length);
			if (data.length == 0) {
				$scope.ans.css = "alert alert-info";
				$scope.ans.msg = "No hay productos pendientes";
			} else {
				$scope.ans = {};
			}
		} else {
			$scope.ans.css = "alert alert-warning";
			$scope.ans.msg = "No se pudieron cargar los productos";
			console.log("Error cargando " + urlproductos);
		}
	});

	$scope.aprobarproducto = function(producto, index) {
		var url = "/api/v1/producto/";
		var uri = producto.resource_uri;
		uri = uri.substring(0, uri.length - 1);
		var init = 0
		var end = uri.lastIndexOf("/");
		var id = uri.substring(init, end);
		producto.activo = true;
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		service.update(url, id, producto, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Producto activado";
				$scope.productos.splice(index, 1);
				return true
			} else {
				$scope.ans.css = "alert alert-warning";
				$scope.ans.msg = "Error al activar producto";
				return false;
			}
		})
	}
}])
.directive("aprobarproducto", function() {
	return {
		templateUrl: "../common/aprobarproducto/aprobarproducto.html"
	};
});