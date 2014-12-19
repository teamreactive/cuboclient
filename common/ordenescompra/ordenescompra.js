angular.module("ordenescompra", ["crud", "ngCookies"])
.controller("OrdenesCompraController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service, $cookies) {

	$scope.ans = {};
	$scope.ans.css = "alert alert-info";
	$scope.ans.msg = "Cargando ordenes...";

	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);

	$scope.ordenes =[];
	var url = "/api/v1/compra/";
	service.readParam(url, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.ordenes = filter(data);
			console.log(url + " " + data.length);
			if ($scope.ordenes.length == 0) {
				$scope.ans.css = "alert alert-info";
				$scope.ans.msg = "No hay ordenes";
			} else {
				$scope.ans = {};
			}
		} else {
			console.log("Error cargando " + url);
			$scope.ans.css = "alert alert-info";
			$scope.ans.msg = "No hay ordenes";
		}
	});

	function filter(data) {
		var ans = [];
		var options = ["0400", "0499", "0500", "0599", "0600", "0700", "0800"];
		for (var i = 0; i < data.length; i++) {
			if (options.indexOf(data[i].estado) != -1) {
				ans.push(data[i]);
			}
		}
		return ans;
	}
}])
.directive("ordenescompra", function() {
	return {
		templateUrl: "../common/ordenescompra/ordenescompra.html"
	};
});