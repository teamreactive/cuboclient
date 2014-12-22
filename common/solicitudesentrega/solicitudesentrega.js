angular.module("solicitudesentrega", ["crud", "ngCookies"])
.controller("SolicitudesEntregaController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {

	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando solicitudes...";

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.solicitudes =[];
	var url = "/api/v1/solicitud/";
	service.readParam(url, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.solicitudes = filter(data);
			console.log(url + " " + data.length);
			if ($scope.solicitudes.length == 0) {
				$scope.ans.css = "alert alert-info";
				$scope.ans.msg = "No hay solicitudes";
			} else {
				$scope.ans = {};
			}
		} else {
			console.log("Error cargando " + url);
			$scope.ans.css = "alert alert-info";
			$scope.ans.msg = "No hay solicitudes";
		}
	});

	function filter(data) {
		var ans = [];
		var options = ["0500", "0599", "0600", "0700", "0800"];
		for (var i = 0; i < data.length; i++) {
			if (options.indexOf(data[i].estado) != -1) {
				ans.push(data[i]);
			}
		}
		return ans;
	}
}])
.directive("solicitudesentrega", function() {
	return {
		templateUrl: "../common/solicitudesentrega/solicitudesentrega.html"
	};
});