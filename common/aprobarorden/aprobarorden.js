angular.module("aprobarorden", ["crud", "ngCookies"])
.controller("AprobarOrdenController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando ordenes pendientes...";

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.ordenes = [];
	var urlordenes = "/api/v1/solicitud/";
	var keys = ["cliente", "activo"];
	var vals = [cliente, false];
	service.readParam(urlordenes, keys, vals, function(status, data) {
		if (status || data.length == 0){
			$scope.ordenes = data;
			console.log(urlordenes + " " + data.length);
			if (data.length == 0) {
				$scope.ans.css = "alert alert-info";
				$scope.ans.msg = "No hay ordenes pendientes";
			} else {
				$scope.ans = {};
			}
		} else {
			$scope.ans.css = "alert alert-warning";
			$scope.ans.msg = "No se pudieron cargar las ordenes";
			console.log("Error cargando " + urlordenes);
		}
	});

	$scope.aprobarorden = function(orden, index) {
		var url = "/api/v1/solicitud/";
		var uri = orden.resource_uri;
		uri = uri.substring(0, uri.length - 1);
		var init = 0
		var end = uri.lastIndexOf("/");
		var id = uri.substring(init, end);
		orden.estado = '0400';
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		service.update(url, id, orden, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Orden aprobada";
				$scope.ordenes.splice(index, 1);
				return true
			} else {
				$scope.ans.css = "alert alert-warning";
				$scope.ans.msg = "Error al activar orden";
				return false;
			}
		})
	}
}])
.directive("aprobarorden", function() {
	return {
		templateUrl: "../common/aprobarorden/aprobarorden.html"
	};
});