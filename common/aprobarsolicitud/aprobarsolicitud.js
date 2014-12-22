angular.module("aprobarsolicitud", ["crud", "ngCookies"])
.controller("AprobarSolicitudController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando solicitudes pendientes...";

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.solicitudes = [];
	var urlproductos = "/api/v1/solicitud/";
	var keys = ["cliente", "activo"];
	var vals = [cliente, false];
	service.readParam(urlproductos, keys, vals, function(status, data) {
		if (status || data.length == 0){
			$scope.solicitudes = data;
			console.log(urlproductos + " " + data.length);
			if (data.length == 0) {
				$scope.ans.css = "alert alert-info";
				$scope.ans.msg = "No hay solicitudes pendientes";
			} else {
				$scope.ans = {};
			}
		} else {
			$scope.ans.css = "alert alert-warning";
			$scope.ans.msg = "No se pudieron cargar las solicitudes";
			console.log("Error cargando " + urlproductos);
		}
	});

	$scope.aprobarsolicitud = function(solicitud, index) {
		var url = "/api/v1/solicitud/";
		var uri = solicitud.resource_uri;
		uri = uri.substring(0, uri.length - 1);
		var init = 0
		var end = uri.lastIndexOf("/");
		var id = uri.substring(init, end);
		solicitud.estado = '0100';
		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";
		service.update(url, id, solicitud, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Solicitud activado";
				$scope.solicitudes.splice(index, 1);
				return true
			} else {
				$scope.ans.css = "alert alert-warning";
				$scope.ans.msg = "Error al activar producto";
				return false;
			}
		})
	}
}])
.directive("aprobarsolicitud", function() {
	return {
		templateUrl: "../common/aprobarsolicitud/aprobarsolicitud.html"
	};
});