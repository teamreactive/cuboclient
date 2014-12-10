angular.module("solicitudescompra", ["crud", "ngCookies"])
.controller("SolicitudesCompraController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {

	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando solicitudes...";

	$scope.solicitudes =[];
	var url = "/api/v1/solicitud/";
	service.read(url, function(status, data) {
		if (status || data.length == 0) {
			$scope.solicitudes = data;
			console.log(url + " " + data.length);
			$scope.ans = {};
		} else {
			console.log("Error cargando " + url);
			$scope.ans.msg = "No hay solicitudes"
		}
	});
}])
.directive("solicitudescompra", function() {
	return {
		templateUrl: "../common/solicitudescompra/solicitudescompra.html"
	};
});