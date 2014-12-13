angular.module("ordenescompra", ["crud", "ngCookies"])
.controller("OrdenesCompraController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {

	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando ordenes...";

	$scope.ordenes =[];
	var url = "/api/v1/compra/";
	service.read(url, function(status, data) {
		if (status || data.length == 0) {
			$scope.ordenes = data;
			console.log(url + " " + data.length);
			$scope.ans = {};
		} else {
			console.log("Error cargando " + url);
			$scope.ans.msg = "No hay ordenes"
		}
	});
}])
.directive("ordenescompra", function() {
	return {
		templateUrl: "../common/ordenescompra/ordenescompra.html"
	};
});